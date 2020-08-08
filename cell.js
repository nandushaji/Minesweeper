function Cell(i,j,w){
    this.w=w;
    this.i=i;
    this.j=j;
    this.x=i*w;
    this.y=j*w;
    this.neighbourCount=0;
    this.bee=false;
    this.revealed=false;
}

Cell.prototype.show= function(){
    stroke(0);
    noFill();
    rect(this.x,this.y,this.w,this.w);
    if(this.revealed){
        if(this.bee){
            fill(127)
            ellipse(this.x+this.w/2,this.y+this.w/2,this.w/2);
        }
        else{
            fill(127);
            noStroke();
            rect(this.x,this.y,this.w,this.w);
            if(this.neighbourCount>0){
                textSize(20);
                textAlign(CENTER);
                fill(0);
                text(this.neighbourCount,this.x+this.w/2,this.y+this.w-25);
            }
         }
    }
}
Cell.prototype.contains=function(x,y){
    return (x>this.x&&x<this.x+this.w&&y>this.y&&y<this.y+this.w);

}
Cell.prototype.reveal=function(){
    this.revealed=true;
    if(this.neighbourCount===0){
        this.floodFill();
     }
}

Cell.prototype.countBee=function(){
    var total=0;
    if(this.bee){
        this.neighbourCount=-1;
        return;
    }
    for(var xoff=-1;xoff<=1;xoff++){
        for(var yoff=-1;yoff<=1;yoff++){
            var i=this.i+xoff;
            var j=this.j+yoff;
            if(i>-1&&i<col&&j>-1&&j<row){
                var neighbour=grid[i][j];
                if(neighbour.bee){
                    total++;
                }
             }
        }
    }
    this.neighbourCount=total;

}

Cell.prototype.floodFill=function(){

    for(var xoff=-1;xoff<=1;xoff++){
            for(var yoff=-1;yoff<=1;yoff++){
                var i=this.i+xoff;
                var j=this.j+yoff;
                if(i>-1&&i<col&&j>-1&&j<row){
                    var neighbour=grid[i][j];
                    if(neighbour.bee!=true&&neighbour.revealed!=true){
                        neighbour.reveal();
                    }
                }
            }
    }
}