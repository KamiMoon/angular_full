/*
 * Webkit - 'webKitTransitionEnd'
 * Mozilla - 'istransitionend'
 * Opera  - 'oTransitionEnd'
 * IE - 'transitionend '
 */
var transitionEndEvent = "webKitTransitionEnd istransitionend oTransitionEnd transitionend webkitAnimationEnd";

$(document).ready(function(){
	var $parking = $("#parking");
	var $train1 = $("#train_1");
	var $locomotive1 = $("#locomotive_1");
	var $containers = $(".container");
		
	
	$locomotive1.click(function(){
		//move the train back and forth
		$train1.toggleClass("trans_train_forward");
	});
	
	$containers.click(function(){
		var $this = $(this);
		
		//copy the orignal
		var $clone = $this.clone();
		
		//start the animation on the orignal to go to empty
		$this.addClass("emptyContainer");
		
		//register for the end of the transition
		$this.one(transitionEndEvent, function(){
			//when it is done animating add the clone
			$clone.appendTo($parking);
		});
		
	});

});