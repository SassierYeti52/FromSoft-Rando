document.addEventListener('DOMContentLoaded', () => {
    // Reference to DOM elements
    const gameSelect = document.getElementById('gameSelect');
    const randomWeaponBtn = document.getElementById('randomWeaponBtn');
    const weaponDetailsDiv = document.getElementById('weaponDetails');
  
    // Global variable to hold the weapons array
    let eldenRingWeapons = [];
  
    // Function to convert a CSV row into the desired weapon object.
    // Assumes the CSV headers include: name, weight, dlc, Str, Dex, Int, Fai, damageType, category, passiveEffect, skill
    function convertRow(row) {
      return {
        name: row.name,
        weight: parseFloat(row.weight),
        dlc: row.dlc,
        requirements: {
          Str: row.Str ? parseInt(row.Str) : 0,
          Dex: row.Dex ? parseInt(row.Dex) : 0,
          Int: row.Int ? parseInt(row.Int) : 0,
          Fai: row.Fai ? parseInt(row.Fai) : 0,
        },
        damageType: row.damageType,
        category: row.category,
        passiveEffect: row.passiveEffect,
        skill: row.skill,
      };
    }
  
    // Use PapaParse to load the CSV file containing the weapon data.
    Papa.parse("Elden Ring Weapon Source Sheet - Sheet1.csv", {
      download: true,
      header: true,
      complete: function (results) {
        // Convert each row into the weapon object
        eldenRingWeapons = results.data.map(convertRow);
        console.log("Loaded weapons:", eldenRingWeapons);
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      }
    });
  
    // Set up the click event for the random weapon button.
    randomWeaponBtn.addEventListener('click', () => {
      let weapons = [];
      if (gameSelect.value === "Elden Ring") {
        weapons = eldenRingWeapons;
      } else {
        // Future game support could be added here.
        weapons = eldenRingWeapons;
      }
  
      // If the weapons data hasn't loaded yet, show a message.
      if (weapons.length === 0) {
        weaponDetailsDiv.innerHTML = "<p>No weapons loaded yet. Please try again shortly.</p>";
        return;
      }
  
      // Pick a random weapon from the array
      const randomIndex = Math.floor(Math.random() * weapons.length);
      const weapon = weapons[randomIndex];
  
      // Format the requirements for display (only show non-zero stats)
      let requirementsText = '';
      for (const stat in weapon.requirements) {
        if (weapon.requirements[stat] > 0) {
          requirementsText += `${stat}: ${weapon.requirements[stat]} `;
        }
      }
  
      // Update the DOM with the selected weapon's details
      weaponDetailsDiv.innerHTML = `
        <h2>${weapon.name}</h2>
        <p><strong>Weight:</strong> ${weapon.weight}</p>
        <p><strong>DLC:</strong> ${weapon.dlc}</p>
        <p><strong>Requirements:</strong> ${requirementsText}</p>
        <p><strong>Damage Type:</strong> ${weapon.damageType}</p>
        <p><strong>Category:</strong> ${weapon.category}</p>
        <p><strong>Passive Effect:</strong> ${weapon.passiveEffect}</p>
        <p><strong>Skill:</strong> ${weapon.skill}</p>
      `;
    });
  });
  