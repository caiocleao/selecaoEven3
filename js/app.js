(function () {

	var app = angular.module('store', [ ]);
	var urlPosts = "http://jsonplaceholder.typicode.com/posts";
	var urlUsers = "http://jsonplaceholder.typicode.com/users";
	var urlComments = "http://jsonplaceholder.typicode.com/comments";
	var globalComments = [];
	var globalPosts = [];

	app.controller('StoreController', ['$sce', '$scope', '$http', function( $sce, $scope, $http ) {
		var scope = this;
		scope.commentShow = 0;
		scope.posts = [];
		scope.users = [];
		scope.comments = [];
		scope.listComments = [];

		var trustedUrlPosts = $sce.trustAsResourceUrl(urlPosts);
		var trustedUrlUsers = $sce.trustAsResourceUrl(urlUsers);
		var trustedUrlComments = $sce.trustAsResourceUrl(urlComments);

		this.users = $http.jsonp(trustedUrlUsers, {jsonpCallbackParam: 'callback'})
		.then(function(usersRecieved) {
			scope.users = usersRecieved.data;
		});

		this.posts = $http.jsonp(trustedUrlPosts, {jsonpCallbackParam: 'callback'})
		.then(function(postsRecieved) {
    		scope.posts = postsRecieved.data;
			globalPosts = postsRecieved.data;
		});

		this.comments = $http.jsonp(trustedUrlComments, {jsonpCallbackParam: 'callback'})
		.then(function(commentsRecieved) {
			scope.comments = commentsRecieved.data;
			globalComments = commentsRecieved.data;
		});

		this.getComments = function (value) {

			scope.listComments = [];
			console.log(value);
			if ( scope.comments.length > 0 ) { 
				for ( i = 0; i < scope.comments.length; i++ ) {
					if ( scope.comments[i].postId === value+1 ) {
						scope.listComments.push(scope.comments[i]);
					}
				}
			}

			if ( scope.commentShow === 0 ) {
				scope.commentShow = 1;
			} else { 
				scope.commentShow = 0;
			}



			return scope.listComments;
		};

		this.hideShowComments = function() {
			return scope.commentShow === 1;
		}

	}]);

	app.controller('postController', function() {
		
		this.bodyValue = 0;
		this.commentValue = 0;
		this.posts = globalPosts;
		this.postComents = [];
		this.addedComment = {};

		this.getComments = function ( idPost ) {
			var comments = [];
			if ( globalComments.length > 0 ) {
				for ( i = 0; i < globalComments.length; i++ ) {
					if ( globalComments[i].postId === idPost ) {
						comments.push(globalComments[i]);
					} 
				}
			}

			if ( this.commentValue === 0 ) {
				this.commentValue = 1;
			} else { 
				this.commentValue = 0;
			}

			commentValue = 1;
			this.postComents = comments;
			return this.postComents;

		}

		this.setBody = function () {
		
			if ( this.bodyValue == 0 ) {
				this.bodyValue = 1;
			} else {
				this.bodyValue = 0;
			}
		};

		this.hideShowBody = function () {
			
			if ( this.bodyValue === 0 ) {
				this.bodyValue = 1;
			} else {
				this.bodyValue = 0;
			}

			return this.bodyValue === 1;
		};

		this.toggleComment = function () {

			if ( this.commentValue === 0 ) {
				this.commentValue = 1;
			} else { 
				this.commentValue = 0;
			}
			console.log(this.commentValue)
		};

		this.addComment = function (post, idPost) {
			this.addedComment.postId = idPost;
			console.log(this.addedComment);
			post.push(this.addedComment);
			globalComments.push(this.addedComment);
			this.addedComment = {};


		}


	});

	app.controller('TabController', function() {
		this.tab = 0;

		this.setTab = function ( value ) {
			this.tab = value;
		};

		this.isSet = function ( value ) {
			return this.tab === value;
		};

	});
	

})();