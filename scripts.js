document.addEventListener("DOMContentLoaded", function() {
    
    const rectangleLengthInput = document.getElementById("rectangleLengthInput");
    const rectangleWidthInput = document.getElementById("rectangleWidthInput");
    const insertRectangleButton = document.getElementById("insertRectangleButton");
    const squareSideInput = document.getElementById("squareSideInput");
    const insertSquareButton = document.getElementById("insertSquareButton");
    const circleRadiusInput = document.getElementById("circleRadiusInput");
    const insertCircleButton = document.getElementById("insertCircleButton");
    const triangleHeightInput = document.getElementById("triangleHeightInput");
    const insertTriangleButton = document.getElementById("insertTriangleButton");
    const drawingBoard = document.getElementById("drawingBoard");
    const shapeInformation = document.getElementById("shapeInformation");
    const nameLabelSpan = document.getElementById("nameLabelSpan");
    const nameValueSpan = document.getElementById("nameValueSpan");
    const heightLabelSpan = document.getElementById("heightLabelSpan");
    const heightValueSpan = document.getElementById("heightValueSpan");
    const widthListItem = document.getElementById("widthListItem");
    const widthLabelSpan = document.getElementById("widthLabelSpan");
    const widthValueSpan = document.getElementById("widthValueSpan");
    const areaLabelSpan = document.getElementById("areaLabelSpan");
    const areaValueSpan = document.getElementById("areaValueSpan");
    const perimeterLabelSpan = document.getElementById("perimeterLabelSpan");
    const perimeterValueSpan = document.getElementById("perimeterValueSpan");
    const resetButton = document.getElementById("resetButton");
    const maximumPixels = 600;
    const colors = ["#007bff", "#6c757d", "#28a745", "#dc3545", "#ffc107", "#17a2b8", "#343a40", "#f8f9fa", "#ffffff", "#6610f2", "#6f42c1", "#e83e8c", "#fd7e14", "#20c997"];
    const shapes = [];

    
    const getRandomValue = (minimum, maximum) => {
        return Math.floor(Math.random() * (maximum - minimum) + minimum);
    }

    
    const shapeCount = () => {
        if(shapes.length > 0) {
            resetButton.removeAttribute("disabled");
        } else if(shapes.length === 0) {
            resetButton.setAttribute("disabled", "true");
        }
    }

    
    class Shape {
        constructor(height, width) {
            this.height = height;
            this.width = width;
            
            this.div = document.createElement("div");
            this.div.classList.add("shape");
            drawingBoard.appendChild(this.div);
            shapes.push(this);
        }

        
        getRandomColor() {
            this.div.style.backgroundColor = colors[getRandomValue(1, 14)];
        }

        
        getRandomLocation() {
            this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
            this.div.style.left = `${getRandomValue(this.width, maximumPixels)}px`;
        }

        
        describeShape(id, height, width) {
            nameValueSpan.innerHTML = `${id}`;
            heightValueSpan.innerHTML = `${height} Pixels`;
            widthValueSpan.innerHTML = `${width} Pixels`;
        }

        
        removeShape() {
            nameLabelSpan.innerHTM = "Name: ";
            heightLabelSpan.innerHTML = "Height: ";
            widthLabelSpan.innerHTML = "Width: ";
            areaLabelSpan.innerHTML = "Area: ";
            perimeterLabelSpan.innerHTML = "Perimeter: ";
            nameValueSpan.innerHTML = "";
            heightValueSpan.innerHTML = "";
            widthValueSpan.innerHTML = "";
            areaValueSpan.innerHTML = "";
            perimeterValueSpan.innerHTML = "";
            drawingBoard.removeChild(this.div);
            shapes.splice(this, 1);
            shapeCount();
        }
    }
    
    class Rectangle extends Shape {
        constructor(height, width) {
            super(height, width);
            this.div.id = "Rectangle";
            this.div.style.height = `${height}px`;
            this.div.style.width = `${width}px`;
            this.getRandomColor();
            this.getRandomLocation();

            
            this.div.addEventListener("click", () => {
                this.describeShape(this.div.id, this.height, this.width);
                areaLabelSpan.innerHTML = "Area: ";
                perimeterLabelSpan.innerHTML = "Perimeter: ";
                areaValueSpan.innerHTML = `${Math.floor(height * width)} Pixels`;
                perimeterValueSpan.innerHTML = `${Math.floor(2 * (height + width))} Pixels`;
            })

            
            this.div.addEventListener("dblclick",() => {
                this.removeShape();
            })
        }

        
        describeShape(id, height, width) {
            nameLabelSpan.innerHTML = "Name: ";
            heightLabelSpan.innerHTML = "Length: ";
            widthLabelSpan.innerHTML = "Width: ";
            nameValueSpan.innerHTML = `${id}`;
            heightValueSpan.innerHTML = `${height} Pixels`;
            widthValueSpan.innerHTML = `${width} Pixels`;
        }
    }
    
    class Square extends Shape {
        constructor(height) {
            super(height);
            this.div.id = "Square";
            this.div.style.height = `${height}px`;
            this.div.style.width = `${height}px`;
            this.getRandomColor();
            this.getRandomLocation();

            
            this.div.addEventListener("click", () => {
                this.describeShape(this.div.id, this.height, this.height);
                areaLabelSpan.innerHTML = "Area: ";
                perimeterLabelSpan.innerHTML = "Perimeter: ";
                areaValueSpan.innerHTML = `${Math.floor(height * height)} Pixels`;
                perimeterValueSpan.innerHTML = `${Math.floor(4 * height)} Pixels`;
            })

            
            this.div.addEventListener("dblclick", () => {
                this.removeShape();
            })
        }

        
        getRandomLocation() {
            this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
            this.div.style.left = `${getRandomValue(this.height, maximumPixels)}px`;
        }

        
        describeShape(id, height) {
            nameLabelSpan.innerHTML = "Name: ";
            heightLabelSpan.innerHTML = "Side: ";
            widthLabelSpan.innerHTML = "Side: ";
            nameValueSpan.innerHTML = `${id}`;
            heightValueSpan.innerHTML = `${height} Pixels`;
            widthValueSpan.innerHTML = `${height} Pixels`;
        }
    }

    
    class Circle extends Shape {
        constructor(height) {
            super(height);
            this.div.id = "Circle";
            this.div.style.height = `${height}px`;
            this.div.style.width = `${height}px`;
            this.getRandomColor();
            this.getRandomLocation();

            
            this.div.addEventListener("click", () => {
                this.describeShape(this.div.id, this.height);
                widthLabelSpan.innerHTML = "Diameter: ";
                areaLabelSpan.innerHTML = "Area: ";
                perimeterLabelSpan.innerHTML = "Circumference: ";
                widthValueSpan.innerHTML = `${Math.floor(2 * height)} Pixels`;
                areaValueSpan.innerHTML = `${Math.floor(Math.PI * (height * height))} Pixels`;
                perimeterValueSpan.innerHTML = `${Math.floor(2 * Math.PI * height)} Pixels`;
            })

           
            this.div.addEventListener("dblclick", () => {
                this.removeShape();
            })
        }

        
        getRandomLocation() {
            this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
            this.div.style.left = `${getRandomValue(this.height, maximumPixels)}px`;
        }

       
        describeShape(id, height) {
            nameLabelSpan.innerHTML = "Name: ";
            heightLabelSpan.innerHTML = "Radius: ";
            nameValueSpan.innerHTML = `${id}`;
            heightValueSpan.innerHTML = `${height} Pixels`;
        }
    }

    
    class Triangle extends Shape {
        constructor(height) {
            super(height);
            this.div.id = "Triangle";
            this.div.style.borderBottomWidth = `${height}px`;
            this.div.style.borderRightWidth = `${height}px`;
            this.getRandomColor();
            this.getRandomLocation();

            
            this.div.addEventListener("click", () => {
                this.describeShape(this.div.id, this.height);
                areaLabelSpan.innerHTML = "Area: ";
                perimeterLabelSpan.innerHTML = "Circumference: ";
                areaValueSpan.innerHTML = `${Math.floor(0.5 * height * height)} Pixels`;
                perimeterValueSpan.innerHTML = `${Math.floor(2 * (height * height) + Math.sqrt(2) * height)} Pixels`;
            })

           
            this.div.addEventListener("dblclick", () => {
                this.removeShape();
            })
        }

        
        getRandomColor() {
            this.div.style.borderBottomColor = colors[getRandomValue(1, 14)];
        }

        
        getRandomLocation() {
            this.div.style.top = `${getRandomValue(this.height, maximumPixels)}px`;
            this.div.style.left = `${getRandomValue(this.height, maximumPixels)}px`;
        }

        
        describeShape(id, height) {
            nameLabelSpan.innerHTML = "Name: ";
            heightLabelSpan.innerHTML = "Height: ";
            widthLabelSpan.innerHTML = "Base: ";
            nameValueSpan.innerHTML = `${id}`;
            heightValueSpan.innerHTML = `${height} Pixels`;
            widthValueSpan.innerHTML = `${height} Pixels`;
        }
    }

    
    rectangleLengthInput.addEventListener("keyup", function() {
        let rectangleLengthInputValue = document.getElementById("rectangleLengthInput").value;
        let rectangleWidthInputValue = document.getElementById("rectangleWidthInput").value;
        if(rectangleLengthInputValue !== "" && rectangleWidthInputValue !== "") {
            insertRectangleButton.removeAttribute("disabled");
        }
    })

    rectangleWidthInput.addEventListener("keyup", function() {
        let rectangleWidthInputValue = document.getElementById("rectangleWidthInput").value;
        let rectangleLengthInputValue = document.getElementById("rectangleLengthInput").value;
        if(rectangleWidthInputValue !== "" && rectangleLengthInputValue !== "") {
            insertRectangleButton.removeAttribute("disabled");
        }
    })

    squareSideInput.addEventListener("keyup", function() {
        let squareSideInputValue = document.getElementById("squareSideInput").value;
        if(squareSideInputValue !== "") {
            insertSquareButton.removeAttribute("disabled");
        }
    })

    circleRadiusInput.addEventListener("keyup", function() {
        let circleRadiusInputValue = document.getElementById("circleRadiusInput").value;
        if(circleRadiusInputValue !== "") {
            insertCircleButton.removeAttribute("disabled");
        }
    })

    triangleHeightInput.addEventListener("keyup", function() {
        let triangleHeightInputValue = document.getElementById("triangleHeightInput").value;
        if(triangleHeightInputValue !== "") {
            insertTriangleButton.removeAttribute("disabled");
        }
    })

    
    insertRectangleButton.addEventListener("click", function() {
        let rectangleLengthInputValue = document.getElementById("rectangleLengthInput").value;
        let rectangleWidthInputValue = document.getElementById("rectangleWidthInput").value;
        if(rectangleLengthInputValue > maximumPixels - 1 && rectangleWidthInputValue > maximumPixels - 1) {
            alert("Try again! Enter a number less than 600 for the Length and Width!");
        } else if(rectangleLengthInputValue > maximumPixels - 1) {
            alert(`Rut-roh, try again! ${rectangleLengthInputValue} is too high! Enter a number less than ${maximumPixels} for the Length!`);
        } else if(rectangleWidthInputValue > maximumPixels - 1) {
            alert(`Aw shucks, try again! ${rectangleWidthInputValue} is too high! Enter a number less than ${maximumPixels} for the Width!`);
        } else {
            let newRectangle = new Rectangle(rectangleLengthInputValue, rectangleWidthInputValue);
        }
        document.getElementById("rectangleLengthInput").value = "";
        document.getElementById("rectangleWidthInput").value = "";
        shapeCount();
    })

    insertSquareButton.addEventListener("click", function() {
        let squareSideInputValue = document.getElementById("squareSideInput").value;
        if(squareSideInputValue > maximumPixels - 1) {
            alert(`Try again! ${squareSideInputValue} is too high! Enter a number less than ${maximumPixels} for the Side!`);
        } else {
            let newSquare = new Square(squareSideInputValue);
        }
        document.getElementById("squareSideInput").value = "";
        shapeCount();
    })

    insertCircleButton.addEventListener("click", function() {
        let circleRadiusInputValue = document.getElementById("circleRadiusInput").value;
        if(circleRadiusInputValue > maximumPixels - 1) {
            alert(`Try again! ${circleRadiusInputValue} is too high! Enter a number less than ${maximumPixels} for the Radius!`);
        } else {
            let newCircle = new Circle(circleRadiusInputValue);
        }
        document.getElementById("circleRadiusInput").value = "";
        shapeCount();
    })

    insertTriangleButton.addEventListener("click", function() {
        let triangleHeightInputValue = document.getElementById("triangleHeightInput").value;
        if(triangleHeightInputValue > maximumPixels - 1) {
            alert(`Try again! ${triangleHeightInputValue} is too high! Enter a number less than ${maximumPixels} for the Height!`);
        } else {
            let newTriangle = new Triangle(triangleHeightInputValue);
        }
        document.getElementById("triangleHeightInput").value = "";
        shapeCount();
    })

    
    resetButton.addEventListener("click", function () {
        location.reload();
    })
})


console.log('%cEnd%c of scripts.js file!', 'font-weight: 900; color: blue;', 'font-weight: 400; color: blue;'); 