const Command = require('command')

let developer=false, //developer mode: display console messages on used cids and location co-ord of spawn
	userdata=true  //Display all user costume and features data (default true in original)
	
module.exports = function Memelord420(dispatch) {
	
	const {protocol} = require('tera-data-parser'), // ???
		command = Command(dispatch)
	
	let cid,
		name,
		x,
		y,
		z,
		zone,
		serv,
		player,
		pc,
		pcapp,
		target,
		ucid = 33333333333333, //These are like this to prevent conflicts and camera issues
		objcid = 33333333333333,
		npccid = 33333333333333,
		colcid = 33333333333333,
		petcid = 33333333333333,
		shutid = 33333333333333,
		pserver,
		pid,
		w,
		customname
	
	
	///////Dispatches
	dispatch.hook('S_LOGIN', 1, (event) => {
		name = event.name
	})
	
	dispatch.hook('S_LOGIN', 2, (event) => {
		pcid = event.cid
		pserver = event.serverId
		pid = event.playerId
		console.log(event)
	})
	
	dispatch.hook('C_PLAYER_LOCATION', 1, event =>{
		location = event
		w = event.w
		x = event.x1
		y = event.y1
		z = event.z1	
	})
	
	dispatch.hook('S_LOAD_TOPO', 1, event =>{
		zz = event.zone
	})
	
	dispatch.hook('S_SPAWN_USER', 5, event =>{
		if(userdata) console.log('User Found '+event.name, event.appface, event.apphair)
		pc = event
	})
	
	
	//////////Commands
	command.add('snpc', (args1,args2,args3) => {
		spawnNpc([parseFloat(args1),parseFloat(args2),parseFloat(args3)])
	})
	
	command.add('shut', (args) => {
		shuttle([parseFloat(args)])
	})
	
	command.add('col', (args) => {
		collection([parseFloat(args)])
	})
	
	command.add('su', (args1,args2,args3,args4,args5,args6,args7,args8,args9,args10,args11) => {
		customname = (args11===undefined) ? 'Spacecats' : args11
		spawnUser([parseInt(args1),parseInt(args2),parseInt(args3),parseInt(args4),parseInt(args5),parseInt(args6),parseInt(args7),parseInt(args8),parseInt(args9),parseInt(args10),customname])
	})
	
	command.add('obj', (args) => {
		object([parseFloat(args)])
	})
	
	command.add('pet', (args) => { //Unused
		pet(args)
	})
	
	command.add('rmobj', (args) => { 
		rmobj(args)
	})
	
	command.add('rmu', (args) => { 
		rmu(args)
	})
	
	command.add('rmnpc', (args) => {
		rmnpc(args)
	})
	
	command.add('rmcol', (args) => {
		rmcol(args)
	})
	
	command.add('rmshut', (args) => {
		rmshut(args)
	})
	
	command.add('reload', (args) => {
		reload(args)
	})
	
	command.add('scriptme', (args) => {
		scriptPlayer([parseFloat(args)])
	})
	
	command.add('scriptuser', (args) => {
		scriptOther([parseFloat(args)])
	})
	
	command.add('scriptnpc', (args) => {
		scriptc([parseFloat(args)])
	})
	
	command.add('sign', (args) => { //Unused
		sign(args)
	})
	
	command.add('sound', (args) => {
		playSound([parseFloat(args)])
	})
	
	
	///////////Functions
	function reload(args){
		dispatch.toClient('S_SPAWN_ME', 1, {
			target: pcid,
			x: x,
			y: y,
			z: z,
			alive: 1
		})
	}
	
	function scriptOther(SCRIPTUSER){
		dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
			cid: ucid-1,
			unk1: SCRIPTUSER[0],
			unk2: 0
		})
	}
	
	function scriptPlayer(SCRIPTME){
		dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
			cid: pcid,
			unk1: SCRIPTME[0],
			unk2: 0
		})
	}
	
	function playSound(SOUND){
		dispatch.toClient('S_PLAY_EVENT_SOUND', 1, {
			id: SOUND[0],
			unk1: 1,
			unk2: 1
		})
	}
	
	function scriptc(SCRIPTNPC){
		dispatch.toClient('S_START_ACTION_SCRIPT', 1, {
			cid: npccid-1,
			unk1: SCRIPTNPC[0],
			unk2: 0
		})
	}
	
	function shuttle(SHUT){
		dispatch.toClient('S_SPAWN_SHUTTLE', 1, {
			uid: shutid++,
			shuttle: SHUT[0],
			x: x,
			y: y,
			z: z,
			unk1: 24576
		})
		if(developer) console.log(shutid+','+x+','+y+','+z)
	}
	
	function object(OBJ){
		dispatch.toClient('S_SPAWN_WORKOBJECT', 1, {
			uid: objcid++,
			item: OBJ[0],
			x: x,
			y: y,
			z: z,
			unk1: 0,
			unk2: 2, //status of object, default is 2?
			unk3: 0
		})
		if(developer) console.log(objcid+','+x+','+y+','+z)
	}
	
	function collection(COL){
		dispatch.toClient('S_SPAWN_COLLECTION', 1, {
			uid: colcid++,
			item: COL[0],
			amount: 1,
			x: x,
			y: y,
			z: z,
			unk1: 0,
			unk2: 0
		})
		if(developer) console.log(colcid+','+x+','+y+','+z)
	}
	
	function rmu(args){
		dispatch.toClient('S_DESPAWN_USER', 2, {
			target: ucid-1,
			type: 1	
		})
		ucid--
	}
	function rmshut(args){
		dispatch.toClient('S_DESPAWN_SHUTTLE', 1, {
			cid: shutid-1,
		})
		shutid--
	}
	function rmnpc(args){
		dispatch.toClient('S_DESPAWN_NPC', 1, {
			target: npccid-1,
			type: 1	
		})
		npccid--
	}
	
	function rmobj(args){
		dispatch.toClient('S_DESPAWN_WORKOBJECT', 1, {
			uid: objcid-1,
			unk: 0
		})
		objcid--
	}
	
	function rmcol(args){
		dispatch.toClient('S_DESPAWN_COLLECTION', 1, {
			uid: colcid-1,
			unk: 0
		})
		colcid--
	}
	
	function spawnUser(SU) {
		dispatch.toClient('S_SPAWN_USER', 5, {
			serverId: pserver,
			playerId: pid,
			cid: ucid++,
			x: x,
			y: y,
			z: z,
			w: w,
			relation: 1, //determines players relation to you, ex if they're hostile or a guild member
			model: SU[0],
			unk6: 1, //visible
			alive: 1, // alive
			appface: SU[1],
			apphair: SU[2],
			effect: 0, // spawn style? 0 for NYOOM 1 for nothing
			type: 7,
			mount: SU[3],
			title: 0, //title
			weapon: 99216, // just to get models to display
			weaponEnchant: SU[9],
			hairAdornment: SU[4],
			mask: SU[5],
			back: SU[6],
			weaponSkin: SU[8],
			costume: SU[7],
			costumeDye: 0,
			unk43: 1, //costume display
			name: SU[10]
		})
		if(developer) console.log(ucid+','+x+','+y+','+z+','+w) //id,locations
	}
	
	function spawnNpc(SNPC){
		dispatch.toClient('S_SPAWN_NPC', 3, {
			id: npccid++,
			target: 0,
			x: x,
			y: y,
			z: z,
			w: w,
			unk1: 12, //no
			templateId: SNPC[0],
			huntingZoneId: SNPC[1],
			unk4: 110, //no
			unk5: 0, //no
			unk6: 0, //no
			unk7: 5, //race// does not matter
			unk8: 1, //gender? 
			unk9: 290, //mno
			unk10: 3, //no
			unk11: 0, //no
			unk12: SNPC[2], //spawnscript/action script
			ink13: 0, //
			unk14: 0, //
			unk15: 0,
			unk16: 0,
			unk17: 0,
			unk18: 0,
			unk19: 0,
			unk20: 16777216,
			unk25: 16777216				
		})
		if(developer) console.log(npccid+','+x+','+y+','+z+','+w) //display id,location where boss is spawned
	}
}
