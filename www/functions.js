/*global angular, $*/

Math.rad = function (deg) {
	'use strict';
	return deg * Math.PI / 180;
};

Math.deg = function (rad) {
	'use strict';
	return rad * 180 / Math.PI;
};
Math.floatRound = function (x, p) {
	'use strict';
	p = Math.pow(10, p);
	return Math.round(x * p) / p;
};

Math.bearing = function (y, x) {
	'use strict';
	if (x <= 0 && y >= 0) {
		if (x === 0) {
			return 0;
		}
		return 450 - Math.deg(Math.atan2(y, x));
	}
	return 90 - Math.deg(Math.atan2(y, x));
};

Math.eta = function (v, x, fi) {
	'use strict';
	var g = 9.80665;
	return Math.floatRound((x / (v * Math.cos(Math.rad(fi)))), 0);
};

Math.fi = function (v, x, y, low_angle, g) {
	'use strict';
	var v2 = v * v,
		v4 = v2 * v2,
		x2 = x * x;

	if (low_angle === undefined) {
		low_angle = false;
	}
	if (g === undefined || isNaN(y)) {
		g = 9.80665;
	}
	if (y === undefined || isNaN(y)) {
		y = 0;
	}

	if (!low_angle) {
		return Math.atan((v2 + Math.sqrt(v4 - g * ((g * x2) + (2 * y * v2)))) / (g * x));
	}
	return Math.atan((v2 - Math.sqrt(v4 - g * ((g * x2) + (2 * y * v2)))) / (g * x));

};

angular.module('armaApp', []).controller('armaCalcController', ['$scope', '$location', '$filter', function ($scope, $location, $filter) {
	'use strict';
	var ctrl = this;
	this.modes = "";
	this.types = [
		{
			id: "mortar",
			name: "MK6 Mortar",
			modes: [[34, 499, 70], [139, 1998, 140], [284, 4078, 200]]
		},
		{
			id: "mlrs",
			name: "M5 Sandstorm",
			modes: [[799, 4604, 212.5], [3918, 18418, 425], [7196, 41442, 637.5], [12792, 73674, 772.5]]
		},
		{
			id: "howitzer",
			name: "2S9 Sochor / M4 Scorcher",
			modes: [[826, 2415, 153.9], [2059, 6021, 243], [5271, 15414, 388.8], [14644, 42818, 648], [22881, 6903, 810]]
		}
	];
	this.pref = 0;
	this.b = 0;
	this.calc = function (p) { // p - preferowane ustawienie (mode)
		var v = ctrl.type, // typ pojazdu
			x = ctrl.d, // odległość
			y = ctrl.a, // wysokość
			i,
			t,
			fi,
			c = ctrl;

		if (p !== undefined) {
			c.pref = p;
		}

		// Odległość
		if (!ctrl.insight) {
			x = Math.round(100 * Math.sqrt(((c.bx - c.tx) * (c.bx - c.tx)) + ((c.by - c.ty) * (c.by - c.ty)))) / 10;
			c.d = x;
			y = Math.round(10 * (c.tz - c.bz)) / 10;
			c.a = y;

			c.b = Math.floatRound(Math.bearing(c.ty - c.by, c.tx - c.bx), 2);
			$('.bearing .range-slider').foundation('slider', 'set_value', Math.round(c.b));
		} else {
			x = c.d;
			y = c.a;
		}

		// Typ pojazdu
		for (i = 0; i < ctrl.types.length; i += 1) {
			t = ctrl.types[i];
			if (t.id === v) {
				v = t.modes;
				break;
			}
		}

		if (v !== undefined) {
			c.modes = "";
			for (i = v.length - 1; i >= 0; i -= 1) {
				t = v[i];
				if (x >= t[0] && x <= t[1]) { // porównanie odległości
					c.mode = i;
					c.modes += (i).toString();
				}
			}
			if (c.modes !== "") {
				// console.log(c.mode + "\t " + c.pref);
				if (c.modes.indexOf(c.pref.toString()) !== -1) {
					c.mode = c.pref;
				}
				v = v[c.mode];
				$('.vertical-range').foundation('slider', 'set_value', c.mode + 1);
				$('.vertical-range').foundation('slider', 'set_value', c.mode + 1);
				v = v[2]; // prędkość pocisku

				fi = Math.floatRound(Math.deg(Math.fi(v, x, y)), 2);
				$("#elvh").val(fi);
				$("#etah").val(Math.eta(v, x, fi));

				fi = Math.floatRound(Math.deg(Math.fi(v, x, y, true)), 2);
				$("#elvl").val(fi);
				$("#etal").val(Math.eta(v, x, fi));
			}
		}

	};
	$scope.Math = Math;
	$scope.fixed = Number.toFixed;
}]);


$(window).load(function () {
	'use strict';
	var $type = $(".type select"),
		$mode = $("#insight");
	
	$(document).foundation();

	if (localStorage.type !== null) {
		$type.val(localStorage.type);
	}

	if (localStorage.mode !== null && localStorage.mode !== undefined) {
		if (localStorage.mode === "direct") {
			$mode.trigger("click");
		}
	} else {
		localStorage.mode = "indirect";
	}

	$type.on("change", function () {
		localStorage.type = $type.val();
	});
	$mode.on("click", function () {
		if (localStorage.mode === "indirect") {
			localStorage.mode = "direct";
		} else {
			localStorage.mode = "indirect";
		}
	});

	/*$('.range .range-slider').on('change.fndtn.slider', function () {
		
	});*/
});