function make2DArray(row,col){
    var arr=new Array(col);
    for(var i=0;i<col;i++){
        arr[i]=new Array(row);
    }
    return arr;
}

var bees=20;
var grid;
var row;
var col;
var w=60;
function setup(){
    createCanvas(600, 600);
    row=floor(width/w);
    col=floor(height/w);
    grid= make2DArray(row,col);
    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            grid[i][j]=new Cell(i,j,w);
        }
    }
    var options=[];
    for(var i=0;i<col;i++){
        for(var j=0;j<row;j++){
            options.push([i,j])
        }
    }

    for(var n=0;n<bees;n++){
        var index=floor(random(options.length));
        var choice=options[index];
        var i=choice[0];
        var j=choice[1];
        grid[i][j].bee=true;
        options.splice(index,1)
    }

    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            grid[i][j].countBee();
        }
    }

}
function gameOver(){
    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            grid[i][j].reveal();
            }
        }


}
function mousePressed(){
    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            if(grid[i][j].contains(mouseX,mouseY)){
                grid[i][j].reveal();
                if(grid[i][j].bee){
                    gameOver();
                }
            }
            
        }
    }

}

function draw(){
    background(255);
    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            grid[i][j].show();
        }
    }

}