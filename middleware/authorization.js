const aclify = require('aclify');

const mongoose = require('mongoose');
const config = require('../config');

const acl = new aclify.Acl(new aclify.MongoDBStore(mongoose.connection.db, config.db.aclCollectionPrefix));

module.exports = {

	init: function() {
    
      // acl.isAllowed('admin', 'admin', '*', function(err, res){
      //   if(res){
      //       console.log("User admin is allowed to view admin")
      //       }
      
    set_roles();

    function set_roles () {
      acl.allow(
        [{
            roles: 'admin',
            allows: [{
                      resources: '/admin',
                      permissions: '*'
                    }
                ]
          }, 
          {
             roles: 'user',
             allows: [{
             resources: 'blog',
             permissions: ['view', 'edit', 'delete']
            }]
          }, 
          {
            roles: 'guest',
            allows: []
           }
        ]);

    // acl.addUserRoles('5c0ed495018cc904c0846f68', 'admin').then(function (res){
    //     console.log('Added myself ' + res);
    // }).catch(function (err){
    //     console.log('Didnt worked m8' + err);
    // });

  		// acl.addRoleParents('admin', 'user');
		// acl.addRoleParents('user', 'guest');
	}
	},

	getAcl: function() {
		return acl;
	}
};
