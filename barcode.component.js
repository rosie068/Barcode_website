var app = angular.module('app');

app.component('barcode', {
    templateUrl: 'components/barcode/barcode.component.html',
    controller: ($scope) => { 
        //let codeReader = new ZXing.BrowserMultiFormatReader();
        let selectedDeviceId;
        const codeReader = new ZXing.BrowserBarcodeReader()
        codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {
                const sourceSelect = document.getElementById('sourceSelect')
                selectedDeviceId = videoInputDevices[0].deviceId
                if (videoInputDevices.length > 1) {
                    videoInputDevices.forEach((element) => {
                        const sourceOption = document.createElement('option')
                        sourceOption.text = element.label
                        sourceOption.value = element.deviceId
                        sourceSelect.appendChild(sourceOption)
                    })

                    sourceSelect.onchange = () => {
                        selectedDeviceId = sourceSelect.value;
                    }

                    const sourceSelectPanel = document.getElementById('sourceSelectPanel')
                    sourceSelectPanel.style.display = 'block'
                }})

            /*
            document.getElementById('startButton').addEventListener('click', () => {
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
              if (result) {
                console.log(result)
                document.getElementById('result').textContent = result.text
              }
              if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(err)
                document.getElementById('result').textContent = err
              }
            })
            console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
          })

          document.getElementById('resetButton').addEventListener('click', () => {
            codeReader.reset()
            document.getElementById('result').textContent = '';
            console.log('Reset.')
          })

        })
        .catch((err) => {
          console.error(err)
        })*/

        var outputMessage = function(msg){
            console.log(msg);
            $("#output").append(`<div>${msg}</div>`);}

        var turnCameraOn = function(opt){
            if(opt){
                $('.video-on').hide();
                $('.video-off').show();
            }else{
                $('.video-off').hide();
                $('.video-on').show();
            }}

        $scope.startVideoDecoding = function(){ 
        	video.setAttribute("playsinline", true);
			video.setAttribute("controls", true);

            turnCameraOn(true); 

            console.log(selectedDeviceId)
            codeReader.decodeOnceFromVideoDevice(selectedDeviceId, 'video').then((result) => {
                            console.log(result)
                            document.getElementById('result').textContent = result.text
                        }).catch((err) => {
                            console.error(err)
                            document.getElementById('result').textContent = err
                        })
                        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)

            /*
            //choose camera
            codeReader.decodeOnceFromVideoDevice(undefined, 'video')
            .then(result => outputMessage(result.text))
            .then(() => $scope.endVideoDecoding())
            .catch(err => console.error(err))*/

        $scope.endVideoDecoding = function(){
            turnCameraOn(false);
            codeReader.reset();}
    }},
})
