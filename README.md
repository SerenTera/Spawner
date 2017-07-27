# Spawner
Ever wanted to spawn an army of popori? Well now you can with this incredibly poorly coded trainwreck!

## Commands
Requires commands module by Pinkie Pie

Type in /proxy chat without '!' for commands. Separate arguments with a space (eg: /proxy snpc 1001 1201 102211)

* `SNPC <TemplateId> <HuntingZone> <SpawnScript>` Spawns in an NPC. Spawnscript refers to ActionScripts - Will crash you if you spawn an invalid NPC.
* `SU <Model> <Face> <Hair> <Mount> <hairitem> <maskitem> <backitem> <costume> <weaponSkin> <WeaponEnchant>` Spawns a player. Face and hair values can be found spammed in the console from other players(Currently I have no idea how the data is set out). Player relation and name can be changed in the script currently.
* `SC <ID>` Spawns a "collection"/collecatable item
* `SHUT <ID>` Spawns a shuttle/elevator.
* `SOUND <ID>` Plays a sound
* `OBJ <ID>` Spawns a "Work object" IDs can be found <here>. Far less cool than it sounds.
* `RM<OBJ/NPC/U/SHUT/COL>` Despawns the last thing spawned. EG. !RMU will delete the last user spawned in with !su
* `SCRIPT<ME/USER/NPC>` Applys an actionscript to the last thing spawned or yourself. Can lock your character in place or teleport you client side, requiring a restart to fix.
* `RELOAD` Sends S_SPAWN_ME to fix camera/other issues.

## IDs
* Collection, NPC, Shuttle, Object and character model IDs can be found [Here](https://docs.google.com/spreadsheets/d/1Inba-tW70grzqisvpdFPpKFfgz5XTptFygjUNb1T1hw/edit?usp=sharing). ActionScripts [Here](https://drive.google.com/file/d/0B9CbzlVpo0LuTjVWZ19Lel8wVjQ/view?usp=sharing) - Now also in main sheet in more readable format. Costume/etc ids can be found [Here](http://teradatabase.net/)

## Future changes
* Use electron for less cancerous spawning
* Make variables settable rather than required, eg !set npc hair 264704
* Make some less disgusting way of removing things
* Implement way of changing NPCs/PCs on the fly
* Add default values to avoid crashes/weird issues
* Add more things

## FAQ
* *Can I interact with the sp-* no. Everything you spawn is client side only.
* *no work* - Please make sure that you have the current (future from the time of writing this) version of tera-data, as some definitions have been changed/added. Or use the fork found on my git page
* *Help! My camera zoomed in and now I can't unzoom it!* Some actionscripts and ID issues can do this, try !reload
* *Help! My game crashed!* Invalid IDs do this.
* *This script is terrible!* Feel free to fork it and add your own things/fix my terrible code.

## Updates
* Added !sound
