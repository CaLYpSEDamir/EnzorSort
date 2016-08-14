//
//$( document ).ready(function() {
//    generate();
//});

function p(el){
    console.log(el);
}

var numbers = shuffle([1,2,3,4,5, 6, 7, 8, 9]),
    time = [2, 5, 9, 12, 18, 23, 29, 37, 44],
    count = numbers.length,
    width = 600;
    treeManager = new TreeManager(width, count);

function getNumbers(){

    var numbers = [];

    for(var i=0;i<count;i++){
        numbers.push(Math.floor((Math.random() * 10) + 1));
    }
    return shuffle(numbers);
}

function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i),
	    x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function generate(){

    var elemTmpl = $.templates("#Elem"),
		list = $('.list');

    $(numbers).each(function(index, number){
        setTimeout(function (){
            list.append(
                elemTmpl.render({val:number})
            );
        }, 500*(index));
    });
}

function prebuild(){
	var copyTmpl = $.templates("#copyElem"),
		treeList = $('.list-copy');

	$(".list-item").each(
        function(index, el){
            var $el = $(el);

            setTimeout(function (){
				treeList.append(copyTmpl.render({
					val:$el.find('p').text()
					}));

            }, 50*index);
        }
    );

    setTimeout(build, 1000);
}

function summy(arr){
    var res = [arr[0]];

    for(var i=1;i<arr.length;i++){
        res.push(
            [res[i-1][0]+arr[i][0],
            res[i-1][1]+arr[i][1],
            arr[i][2]]);
    }
    return res
}



function build(){

    var items = $(".copy-list-item"),
        root = $("#r"),
        rX = root.offset().left,
        rY = root.offset().top-50;

    items.removeClass('slideUpRetourn');

    items.each(
        function(index, el){
            var $el = $(el),
                elX = $el.offset().left,
                elY = $el.offset().top;

            setTimeout(function(){

                var coords = (treeManager.add($el.attr('value')));
                coords = summy([[rX-elX, rY-elY]].concat(coords));

                $(coords).each(
                    function(j, coord){
                        setTimeout(
                            function(){
                                $el.css('-webkit-transform', "translate("+
                                (coord[0])+"px,"+
                                (coord[1])+"px)");
                                $el.find('span').text(coord[2]);
                            }, 1000*j);
                    }
                )
//            }, 5000*index);
            }, 1000*time[index]);
        }
    );
}

function sort(){
    var result = treeManager.sortIter(),
        elemTmpl = $.templates("#Elem"),
		sList = $('.sorted');

    $(result).each(
        function(index, res){

            setTimeout(function(){

            var i = $('.copy-list-item').filter(function(index){

                    return $( this ).attr( "value" ) ==res[0];
               })
            i.css('background-color', 'transparent');
            for(var i=0; i<res[1]; i++){
                sList.append(elemTmpl.render({
					val:res[0]
					}));
            }
            }, index*1000);
        });
}

