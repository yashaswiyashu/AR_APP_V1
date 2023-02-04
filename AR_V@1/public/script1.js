const data = [
    {
        VideoLocation: "#vid-0",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-0.patt",
    },
    {
        VideoLocation: "#vid-1",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-1.patt",
    },
    {
        VideoLocation: "#vid-2",
        PatternLocation: "resources/markers/pattern-Individual_Blocks-2.patt",
    }
];

var markersURLArray = [];
var markersNameArray = [];
var Url = "";

const start = async () => {
    AFRAME.registerComponent("markers_start", {
        init: function () {
            console.log("Add markers to the scene");
            var sceneEl = document.querySelector("a-scene");
            //list of the markers
            for (var i = 0; i < 3; i++) {
                var url = data[i].PatternLocation;
                markersURLArray.push(url);
                markersNameArray.push("Marker_" + i);
            }
            for (var k = 0; k < 3; k++) {
                var markerEl = document.createElement("a-marker");
                markerEl.setAttribute("type", "pattern");
                markerEl.setAttribute("url", markersURLArray[k]);
                markerEl.setAttribute("id", markersNameArray[k]);
                markerEl.setAttribute("registerevents", {
                    video: data[k].VideoLocation,
                });
                markerEl.setAttribute("play-pause", "");
                markerEl.setAttribute("location", "");
                sceneEl.appendChild(markerEl);

                var cube = document.createElement("a-box");
                cube.setAttribute("id", "vid-box");
                cube.setAttribute("material", { src: data[k].VideoLocation });
                cube.object3D.position.set(0, 0, 0);
                cube.object3D.rotation.set(0, 0, 0);
                markerEl.appendChild(cube);
            }
        },
    });
    AFRAME.registerComponent("registerevents", {
        schema: {
            video: { type: "selector" },
        },
        init: function () {
            this.video = this.data.video;
            this.video.pause();
            const marker = this.el;
            marker.addEventListener("markerFound", () => {
                var markerId = marker.id;
                console.log("Marker Found: ", markerId);
            });

            marker.addEventListener("markerLost", () => {
                var markerId = marker.id;
                console.log("Marker Lost: ", markerId);
            });
        },
        tick: function () {
            if (this.el.object3D.visible == true) {
                if (!this.toggle) {
                    this.toggle = true;
                    this.video.play();
                }
            } else {
                this.toggle = false;
                this.video.pause();
            }
        },
    });
    AFRAME.registerComponent("location", {
        init: function () {
            const marker = this.el;
            marker.addEventListener("markerFound", () => {
                var markerId = marker.id;
                if (markerId === 'Marker_0') {
                    Url = "https://www.google.com/maps/place/Sports+Drome/@12.895956,77.5763877,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae154c63d1dd97:0xeabe1258b6933afe!8m2!3d12.8959508!4d77.5785764!16s%2Fg%2F11g30tn7tf";
                }
                else if (markerId === 'Marker_1') {
                    Url = "https://www.google.com/maps/place/Meridian+Fitness/@12.9031812,77.5859514,15z/data=!4m6!3m5!1s0x3bae15a2936ae4d7:0x242b6e9837c4c455!8m2!3d12.9031812!4d77.5859514!16s%2Fg%2F11p654md19";
                }
                else if (markerId === 'Marker_2') {
                    Url = "https://www.google.com/maps/dir/13.0089314,77.5573596/Prafulla+Enclave,+Halady+Rd,+Koteshwara+Proper,+Karnataka+576222+@13.593053,74.713309/@13.2911506,73.8908877,7z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x3bbc91be62b45ca9:0x8568c98391e2caf6!2m2!1d74.7133091!2d13.5930534!3e9";
                }
            });

            document.querySelector(".btn").addEventListener("click", function () {
                window.open(Url, '_blank');
            });
        }
    })
}

start();