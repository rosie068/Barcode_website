var app = angular.module('app');

app.component('barcode', {
    templateUrl: 'components/barcode/barcode.component.html',
    controller: ($scope) => { 
        let codeReader = new ZXing.BrowserMultiFormatReader();

        var outputMessage = function(msg){
            $("#output").append(`<div>${msg}</div>`);
        }

        var turnCameraOn = function(opt){
            if(opt){
                $('.video-on').hide();
                $('.video-off').show();
            }else{
                $('.video-off').hide();
                $('.video-on').show();
            }
        }

        $scope.startVideoDecoding = function(){
            turnCameraOn(true);
            //choose default camera
            codeReader.decodeOnceFromVideoDevice(undefined, 'video')
            .then(result => outputMessage(result.text))
            .then(() => $scope.endVideoDecoding())
            .catch(err => console.error(err))
        }

        $scope.endVideoDecoding = function(){
            turnCameraOn(false);
            codeReader.reset();
        }    
    },
})
