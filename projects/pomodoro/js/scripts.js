//jQuery

$(document).ready(function() {

    var buzzer = $("#buzzer")[0];
    var count = parseInt($("#num").html()); //sets variable to integer value of the html
    var breakTime = parseInt($("#breakNum").html()); //sets variable to integer value of the html


    $("#reset").hide();

    //Code for Timer
    $("#start").click(function() {

        var counter = setInterval(timer, 1000); //1000 ~ 1 second

        //Convert minutes to seconds
        count *= 60;
        breakTime *= 60;

        //Work Timer Code
        function timer() {

            $("#start, #minus5Clock, #add5Clock, #breakNum, #add5Break, #minus5Break, #title1").hide(); //hide these when we his start
            $("#timeType").html("Study Time: "); // add sesseion time text next to it

            count -= 1; //countdown count variable defined above

            if(count === 0) {
                buzzer.play(); //play sound when done
                clearInterval(counter);

                var startBreak = setInterval(breakTimer, 1000);

                $("#num").hide();
                $("#timeType").html("DONE!");
            }

            //Minutes : Seconds conversion logic
            if(count % 60 >= 10) {
                $("#num").html(Math.floor(count/60) + " : " + count % 60);
            }else{
                $("#num").html(Math.floor(count/60) + " : " + "0" + count % 60);

            }



            //dont need this anymore $("#num").html(count); //changes html text in num to current count

            //Break Function
            function breakTimer() {
                $("#timeType").html("Break Time: ");
                $("#breakNum").show();

                breakTime -= 1;

                //When break is over
                if(breakTime === 0){
                    buzzer.play();
                    clearInterval(startBreak);

                    $("#reset").show();
                    $("#breakNum, #timeType").hide();

                }

                //Break Time m:ss formatting
                if(breakTime % 60 >= 10) {
                    $("#breakNum").html(Math.floor(breakTime/60) + " : " + breakTime % 60);
                }else{
                    $("#breakNum").html(Math.floor(breakTime/60) + " : " + "0" + breakTime % 60);

                }

            }
        }
    }); //end start click


    //Reset Button click
    $("#reset").click(function() {

        //reset variable to original values
        count = 25;
        breakTime = 5;

        $("#num").html(count);
        $("breakNum").html(breakTime);

        //show everything again
        $("#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #num, #title1").show();
        $("#reset").hide();


    });



    //Session minus
    $("#minus5Clock").click(function() {
        if(count > 5) {
            count -= 5;
            $("#num").html(count);
        }
    });

    //Session add
    $("#add5Clock").click(function() {
        count += 5;
        $("#num").html(count);
    });

    //Break minus
    $("#minus5Break").click(function() {
        if(breakTime > 5) {
            breakTime -= 5;
            $("#breakNum").html(breakTime);
        }
    });

    //Break add
    $("#add5Break").click(function() {
        breakTime += 5;
        $("#breakNum").html(breakTime);
    });



});
