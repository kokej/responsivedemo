(function(global) {

    //inicializacion de variables
    var width;
    var height;
    var id;
    var wSize = [];

    //config
    var scale = 0.8;
    var relacion = [1.77, 1.66, 1.33, 0.56];
    var url = 'test.html';
    var errorMsj = "Lo sentimos, no es posible ejecutar la demo en esta resolución.<br><br>Si es posible, inténtelo girando el dispositivo.";
    var rangeValues = ['Phone', 'Tablet', 'Laptop', 'Desktop'];


    var Respdemo = function(id){

        return new Respdemo.init(id);

    }

    Respdemo.protoype = {};


    // cogemos las dimensiones de la ventana
    var prepareRedim = function(){


        //guardamos tamaño ventana
        wSize[0] = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;


        wSize[1] = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        //solucion para un par de resoluciones concretas
        if ((wSize[0]/wSize[1] > 1.32) && (wSize[0]/wSize[1] < 1.35)){
            //console.log('ipad');
            wSize[1] = wSize[1] * 0.8;
        }


    }



    Respdemo.init = function(id){

        var self = this;

        prepareRedim();

        //pasamos id del elemento base
        self.id = document.querySelector(id);
        self.id.style.position = 'relative';
        self.id.style.margin = 'auto';
        self.id.style.padding = '20px';
        self.id.style.border = 'dotted 1px silver';


        //generamos elementos y añadimos a dom
        self.rdOuter = document.createElement("div");
        self.rdOuter.className = "rd-outer";
        self.rdOuter.margin = "auto";
        self.id.appendChild(self.rdOuter);

        self.rdIframe = document.createElement("object");
        self.rdIframe.className = "rd-iframe";
        self.rdIframe.id = "rd-iframe";
        self.rdIframe.data = url;
        self.rdIframe.style.boxSizing = 'border-box';
        self.rdIframe.style.border = 'solid 12px #000';
        self.rdIframe.style.borderRadius = '12px';
        self.rdIframe.style.transition = 'all 0.4s';
        self.rdIframe.innerHTML = "Error: Embedded data could not be displayed";
        self.rdOuter.appendChild(self.rdIframe);

        self.rdEmbed = document.createElement("embed");
        self.rdEmbed.className = "rd-embed";
        self.rdEmbed.src = url;
        self.rdEmbed.data = url;
        self.rdIframe.appendChild(self.rdEmbed);

        self.rdInner = document.createElement("div");
        self.rdInner.className = "rd-inner";
        self.rdInner.id = "rd-inner";
        self.rdInner.style.position = "absolute";
        self.rdInner.style.bottom = "0";
        self.id.appendChild(self.rdInner);

        self.rdRange = document.createElement("input");
        self.rdRange.className = "rd-range";
        self.rdRange.id = "rd-range";
        self.rdRange.type = "range";
        self.rdRange.min = 0;
        self.rdRange.max = 3;
        self.rdRange.step = 1;
        self.rdRange.defaultValue = 3;
        self.rdInner.appendChild(self.rdRange);

        self.rdLabel = document.createElement("label");
        self.rdLabel.className = "rd-label";
        self.rdLabel.id = "rd-label";
        self.rdLabel.id = "rd-label";
        self.rdLabel.style.paddingLeft = "25px";
        self.rdLabel.style.fontSize = "2em";
        self.rdLabel.innerHTML = rangeValues[3];
        self.rdInner.appendChild(self.rdLabel);


        self.rdError = document.createElement("p");
        self.rdError.className = "rd-error";
        self.rdError.id = "rd-error";
        self.rdError.style.fontSize = "1.4em";
        self.rdError.innerHTML = errorMsj;


        //modifica tamaño elemento de acuerdo el valor del input range
        self.redim = function(param1, param2, param3){

            prepareRedim();

            //redefinimos tamaño elemento
            self.rdIframe.style.width = param1 * param2 * wSize[1] + 'px';
            self.rdIframe.style.height = param1 * wSize[1] + 'px';
            self.rdOuter.style.width = self.rdIframe.style.width;
            self.rdLabel.innerHTML = rangeValues[param3];
        }


        //modifica tamaño elemento en evento onresize y onload
        self.redimp = function(){

            prepareRedim();

            //redefinimos tamaño elemento
            self.rdIframe.style.width = scale * relacion[0] * wSize[1] + 'px';
            self.rdIframe.style.height = scale * wSize[1] + 'px';
            self.rdOuter.style.width = self.rdIframe.style.width;

            //variables tamaño div contenedor
            var aHeight = self.rdIframe.style.height.substring(self.rdIframe.style.height, self.rdIframe.style.height.length -2, 2);
            var aWidth = self.rdIframe.style.width.substring(self.rdIframe.style.width, self.rdIframe.style.width.length -2, 2);

            self.id.style.height = 1.1 * aHeight + 'px';
            self.id.style.width = aWidth + 'px';



            if (aWidth > wSize[0] - 40){

                self.id.appendChild(self.rdError);
                self.rdOuter.style.display = 'none';
                self.rdInner.style.display = 'none';
                self.id.style.height = scale * wSize[1] + 'px';
                self.id.style.width = scale * wSize[0] + 'px';

            } else {

                if (document.querySelectorAll('.rd-error')[0] != null) {
                    self.id.removeChild(self.rdError);
                }

                self.rdOuter.style.display = 'block';
                self.rdInner.style.display = 'block';

            }


        }


        //cogemos el valor del input range
        self.getValor = function(){

            self.valor = self.rdRange.value;

               switch(self.valor) {
                case '3':
                       self.redim(scale, relacion[0], 3);
                    break;
                case '2':
                       self.redim(scale / 1.15, relacion[1], 2);
                    break;
                case '1':
                       self.redim(scale / 1.33, relacion[2], 1);
                    break;
                case '0':
                       self.redim(scale / 2, relacion[3], 0);
                       self.rdIframe.style.width = scale * relacion[3] * wSize[1] + 'px';
                       self.rdIframe.style.height = scale * wSize[1] + 'px';
                    self.rdOuter.style.width = self.rdIframe.style.width;
                    break;
                default:
                       self.redim(scale, relacion[3], 3);
            }

        };



        //añadimos event listener para input range
        self.rdIframe.addEventListener('load', self.redimp, false);
        self.rdRange.addEventListener('input', self.getValor, false);
        window.addEventListener('resize', self.redimp, false);

    }


    //instanciamos prototype y lo hacemos global
    Respdemo.init.prototype = Respdemo.prototype;
    global.Respdemo = Respdemo;


}(window));


