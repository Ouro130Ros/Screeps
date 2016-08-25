var roles = {
	'harvester': {
		'run': require('roles.harvester').run,
		'count': 2,
		'components': [WORK, CARRY, MOVE]
	},
	'upgrader': { 
		'run': require('roles.upgrader').run,
		'count': 1,
		'components': [WORK, CARRY, MOVE]
	}
}

module.exports.loop = function() {
	var clearMemory = false;

	for(var key in roles){
		if(roles.hasOwnProperty(key)){
			var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == key);
			if(creeps.length < roles[key].count){
				var newName = Game.spawns['HomeSpawn'].createCreep(roles[key].components, undefined, {role: key});
				console.log('Spawning new ' + key + ': ' + newName);
				clearMemory = true;
			}
		}
	}

	if(clearMemory){
		for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:' + name);
        }
	}

	for(var name in Game.creeps){
		roles[Game.creeps[name].memory.role].run(Game.creeps[name]);
	}
}