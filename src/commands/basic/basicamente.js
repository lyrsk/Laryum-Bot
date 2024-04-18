const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../../../db");

const cooldown = new Set();
const targetUser = "natzhux";
const targetUserId = "621458358205153281";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("agus")
    .setDescription(
      `Incrementa el contador de cuántas veces ${targetUser} dice básicamente.`
    ),
  run: async (client, interaction) => {
    if (cooldown.has(interaction.user.id)) {
      await interaction.reply({
        content: "Este comando tiene un cooldown de 2 segundos.",
        ephemeral: true,
      });
      return;
    }

    cooldown.add(interaction.user.id);
    setTimeout(() => cooldown.delete(interaction.user.id), 2000);

    db.get(
      "SELECT count FROM counts WHERE username = ?",
      [targetUser],
      (err, row) => {
        if (err) {
          console.error(err.message);
          interaction.reply("Ocurrió un error al acceder a la base de datos.");
          return;
        }
        let count = 1;
        if (row) {
          count = row.count + 1;
          db.run("UPDATE counts SET count = ? WHERE username = ?", [
            count,
            targetUser,
          ]);
        } else {
          db.run("INSERT INTO counts (username, count) VALUES (?, ?)", [
            targetUser,
            count,
          ]);
        }
        interaction.reply(
          `${client.users.cache
            .get(targetUserId)
            .toString()} ha dicho básicamente ${count} veces. :brain: `
        );
      }
    );
  },
};
