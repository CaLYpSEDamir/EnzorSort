
function Node(val, level, pos){
	this.val = val;
	this.level = level;
	this.position = pos;
	this.count = 1;
	
	this.l = null;
	this.r = null;
}

function Tree(width, levels){
	this.root = null;
	this.ranges = this.getRanges(width, levels);
}

Tree.prototype.getRanges = function(width, levels){

	var ranges = [];

	for(var i=0;i<levels;i++){
		ranges[i+1] = width/Math.pow(2, i+1);
	}
	return ranges;
}


Tree.prototype.addOut = function(nodeOut, valOut) {

	var Y = 50;
		coords = [],
		tree = this;

	function addInn(node, val){
		if(node == null){
			tree.root = new Node(val, 1, 1);
			coords.push([0, Y, 1]);

		} else if(node.val == val){
			node.count += 1;
			coords.push([0, Y, node.count]);

		} else if(node.val > val){
		 	var X = tree.ranges[node.level+1];

		 	coords.push([-X, Y, 1]);

			if(node.l == null){
				node.l = new Node(val, node.level+1, node.position*2-1);
				coords.push([0, Y, 1]);
			} else {
				addInn(node.l, val);
			}
		} else {
			var X = tree.ranges[node.level+1];
			coords.push([X, Y]);

			if(node.r == null){
				node.r = new Node(val, node.level+1, node.position*2+1);

				coords.push([0, Y, 1]);
			} else {
				addInn(node.r, val);
			}
		}
	}
	addInn(nodeOut, valOut);

	return coords
}


Tree.prototype.sortOut = function(nodeOut){
	var items = [];

	function sortInn(node){
		if(node.l != null){
			sortInn(node.l);
		}
		items.push(node);
		if(node.r != null){
			sortInn(node.r);
		}
	}

	sortInn(nodeOut);

	return items;
}


function TreeManager(width, levels){
	var items = [];
	this.tree = new Tree(width, levels);
}


TreeManager.prototype.add = function(val){
	return this.tree.addOut(this.tree.root, val);
}

TreeManager.prototype.sortIter = function(val){

	var nodes =  this.tree.sortOut(this.tree.root),
		result = [];

	$(nodes).each(
        function(index, node){
            result.push([node.val, node.count]);
        })
    return result
}
