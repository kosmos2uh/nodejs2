let acl = require('acl');
const mongoose = require('mongoose');
const config = require('../config');

// acl = new acl(new acl.mongodbBackend(mongoose.connection.db, config.db.aclCollectionPrefix), { debug: function(string) { console.log(string); } });

acl = new acl(new acl.memoryBackend());

module.exports = {
	init: function() {
		acl.addRoleParents('admin', 'user');
		acl.addRoleParents('user', 'guest');

		acl.allow([
		   {
            roles: ['admin'],
	            allows: [
	                { 
	                	resources: ['admin'], 
	                	permissions: ['get']
	                }
	            ]
        	}, 
        	{
            roles: ['user'],
	            allows: [
	                { 
	                	resources: ['profile', 'forum'], 
	                	permissions: ['get', 'put'] 
	                }
	            ]
        	}, 
        	{
            roles: ['guest'],
            	allows: []
        	}
		]);

	
	},

	getAcl: function() {
		return acl;
	}
};
