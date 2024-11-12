class PieChart {
    constructor(elementID,data,width=400, height=400, backgorundColor='white'){
        this.elementID = elementID;
        this.data = data;
        this.width = width;
        this.height = height;
        this.backgorundColor = backgorundColor;
        this.draw();
    }

    draw(){
        let div = document.getElementById(this.elementID);
        div.innerHTML = '';
        let canvas = document.createElement('canvas');

        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.backgroundColor = this.backgorundColor;

        div.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        let total = 0;
        this.data.forEach((element) => {
            total += element.value;
        });
        
        let startAngle = 0;
        let endAngle = 0;
        this.data.forEach((section) => {
            let sectionAngle = (2*Math.PI)*section.value/total;  //(2*Math.PI) = 1 Full Circle
            endAngle = startAngle+sectionAngle;

            ctx.beginPath();
            ctx.moveTo(this.width/2, this.height/2);
            let radius = this.width/2;
            ctx.arc(this.width/2, this.width/2, radius, startAngle, endAngle);
            ctx.fillStyle = section.color;
            ctx.fill();
            startAngle = endAngle;

            //For Labels
            ctx.font = "20px Arial";
            ctx.fontWeight = 'bold';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            //Find Mid
            let middleAngle = startAngle - (sectionAngle/2);
            let x = radius + (radius/2*Math.cos(middleAngle));
            let y = radius + (radius/2*Math.sin(middleAngle));
            ctx.fillText(section.label, x,y);

        });
    }

    update(data){
        this.data = data;
        this.draw();
    }

    addData(label,value,color){
        value = Number(value);
        this.data.push({label,value,color});
        this.draw();
    }

    removeData(index){
        this.data.splice(index,1);
        this.draw();
    }
}

export {PieChart};