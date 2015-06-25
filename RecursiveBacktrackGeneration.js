Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i].x === obj.x & this[i].y === obj.y) {
            return true;
        }
    }
    return false;
}

Array.prototype.indexO = function(obj){
    var i = this.length;
    while (i--) {
        if (this[i].x === obj.x & this[i].y === obj.y) {
            return i;
        }
    }
    return -1;
}



RecursiveBacktrackGenerator = function(len){
    this.len = len;
    this.cellCount = len * len;
    //pair nesneleri nerelerin ziyater edilip nerenin edilmediğini kontrol ediyor.
    //iki listeden biri ziyaret edilenleri diğeri edilmeyenleri tutar
    this.visitedCells = [];
    this.unVisitedCells = [];
    this.travelStack = []; //visited cells stack
    this.currentPoint = new Pair(-1, -1);
    this.back = 1;
};

RecursiveBacktrackGenerator.prototype = {

    run: function(){
        this.init();
        this.start();
        this.generate();
    },

    start: function(){
        this.currentPoint = new Pair(this.randBetween(0, this.len), this.randBetween(0, this.len));
    },

    init: function(){
        var i = 0, j = 0;
        while(i < this.len){
            j = 0;
            while(j < this.len){
                this.unVisitedCells.push(new Pair(i, j));
                j++;
            }
            i++;
        }
    },

    generate: function(){
        //until all cells visited
        while(this.unVisitedCells.length != 0){
            var avaiableNeighbors = this.whichNeighborsAvaiable(this.currentPoint);
            if(avaiableNeighbors.length > 0){
                this.back = 1;
                way = this.decideWay(avaiableNeighbors);
                var incrementPoint = this.wayToIncrementPoint(way);
                var newPair = new Pair(this.currentPoint.x + incrementPoint.x, this.currentPoint.y + incrementPoint.y);

                if(newPair.x > -1 & newPair.y > -1 & newPair.x < this.len & newPair.y < this.len){
                    this.visitedCells.push(newPair);
                    this.travelStack.push(newPair);
                    this.currentPoint = newPair;
                    var indexofNew = this.unVisitedCells.indexO(newPair);
                    this.unVisitedCells.splice(indexofNew, 1);
                }
            } else {
                this.currentPoint = this.visitedCells[this.visitedCells.length -1 - this.back];
                this.back++;
            }

        }
    },

    /**
     * This method calculates a pair object to show what is increment
     */
    wayToIncrementPoint: function(way){
        var returnPoint = {};
        switch(way){
            case "LEFT":
                returnPoint = new Pair(-1, 0);
                break;
            case "RIGHT":
                returnPoint = new Pair(1, 0);
                break;
            case "UP":
                returnPoint = new Pair(0, -1);
                break;
            case "DOWN":
                returnPoint = new Pair(0, 1);
                break;
        }

        return returnPoint;
    },

    /**
     * This function uses monte-carlo simulation to choose a direction to go
     */
    decideWay: function(ways){
        var wayCount = ways.length;
        var one = 1.00;
        var decisionRange = one / wayCount;

        var _rnd = Math.random();

        if(_rnd <= decisionRange){
            return ways[0];
        } else if(_rnd > decisionRange & _rnd <= 2 * decisionRange){
            return ways[1];
        } else if (_rnd > decisionRange *2 & _rnd <= 3 * decisionRange){
            return ways[2];
        } else if(_rnd > decisionRange * 3 & _rnd <= one){
            return ways[3];
        }
    },

    /**
     * param position pair last visited position
     * this function decides wich directions are avaiable to visit
     */
    whichNeighborsAvaiable: function(position){
        var avaiableNeighbors = [];
        var left = new Pair(position.x - 1, position.y);
        var right = new Pair(position.x + 1, position.y);
        var up = new Pair(position.x, position.y - 1);
        var down = new Pair(position.x, position.y + 1);

        if(this.unVisitedCells.contains(left)){
            avaiableNeighbors.push("LEFT");
        }
        if(this.unVisitedCells.contains(right)){
            avaiableNeighbors.push("RIGHT");
        }
        if(this.unVisitedCells.contains(up)){
            avaiableNeighbors.push("UP");
        }
        if(this.unVisitedCells.contains(down)){
            avaiableNeighbors.push("DOWN");
        }

        return avaiableNeighbors;
    },

    randBetween: function(min, max){
        return Math.floor(Math.random()*(max));
    }
}

function removeItem(arr, key){
    var index = arr.indexOf(key);

    return arr.splice(index, 1);
}

RecursiveBacktrackGenerator.prototype.constructor = RecursiveBacktrackGenerator;


/**
 * Pair object definition
 */
Pair = function(x, y){
  this.x = x;
  this.y = y;
}
