(function() {
	"use strict";

	angular.module('flappernews', [
		'ui.router'
	])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('home');
			
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: '/home.html',
					controller: 'MainCtrl as main'
				})
				.state('post', {
					// or can be writen url: '/posts/{id}'
					url: '/posts/:id',
					templateUrl: '/post.html',
					controller: 'PostCtrl as post'
				})

	}]) // end of config
		
	.factory('posts', [
		o.getAll = function() {
    		return $http.get('/posts').success(function(data){
      		angular.copy(data, o.posts);
    		});
  		};
		// function() {
		// 	var postsObject = {
		// 		posts: [
		// 		{title: 'post 1', upvotes: 5},
		// 		{title: 'post 2',upvotes: 2},
		// 		{title: 'post 3',upvotes: 15},
		// 		{ title: 'post 4', upvotes: 5 },
		// 		{ title: 'post 5', upvotes: 5 }
		// 		]
		// 	}
		// 	return postsObject.posts;
	}]) // end of posts factory

	.controller('MainCtrl', [
		'posts', 
		function(posts) {
		
			var main = this;
			main.posts = posts;

			main.addPost = function() {
				if(!main.title || main.title === '') { return; }
				
				main.posts.push({
					title: main.title,
					link: main.link,
					upvotes: 0,
					comments: [
				    {author: 'Joe', body: 'Cool post!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				  ]
				});
				
				main.title = '';
				main.link = '';
			}
			main.incrementVote = function(post) {
				post.upvotes += 1;
			}
	}]) // end of MainCtrl controller

	.controller('PostCtrl', [
		'$stateParams', 
		'posts', 
		function($stateParams, posts) {

			var post = this;

			post.individualPost = posts[$stateParams.id]; 

			post.addComment = function() {
				if(post.body === '') {return;}

				post.individualPost.comments.push({
					body: post.body,
					author: 'user',
					upvotes: 0
				});
				post.body = '';
			}
	}]) // end of PostCtrl controller

	.filter('capitalize', function() {
		return function(text) {
			return text.toUpperCase();		
		}
	}) // end of capitalize filter
})(); 
