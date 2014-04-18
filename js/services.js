'use strict';

/* Services */
angular.module('myApp.services', []).

	service('Cart', function(){
		this.cart = [];
		
		this.load = function(){
			console.log('load cart');
			this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
			console.log(this.cart);
		};
		
		this.save = function(){
			localStorage.setItem('cart', JSON.stringify(this.cart));
			console.log('save cart');
			console.log(this.cart);
		};
		
		this.index = function( item ) {
			
			for( var i=0, il=this.cart.length; i<il; i++)
				if (this.cart[i].product_option_id == item.product_option_id)
					return i;
	
			return -1;
		
		}
		
		this.find = function( item ) {
			
			var index = this.index(item);
			if (index==-1) {
				return null;
			} else {
				return this.cart[index];
			}
	
		};
		
		this.add = function( item, quantity ){
			
			var i=this.find(item);
			if (i) {
				i.order = Math.max( Math.min( i.quantity, i.order+quantity ), 1 );
			} else {
				item.order = Math.max( Math.min( item.quantity, quantity ), 1 );
				this.cart.push(item);
			}
			this.save();
	
		};
		
		this.remove = function( item ){
			var i=this.index(item);
			if (i != -1) {
				this.cart.splice(i, 1);
				this.save();
			}
		}
		
		this.getCount = function() {
			return this.cart.length;
		}
		
		this.getSum = function() {
			var sum = 0;
			for( var i=0, il=this.cart.length; i<il; i++)
				sum += this.cart[i].order*this.cart[i].price;
			return sum;
		}
		
		this.get = function(){
			return this.cart;
		}
		
		this.load();
		
	});