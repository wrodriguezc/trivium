/*
Trivium in Javascript, 29 April 2009 by Charlie Loyd <c@6jo.org>.

*/

function shifter(state) {
  var ceil = state.length;
  var ptr = 0;

  this.get = function (n) {
    n = (n + ceil + ptr) % ceil;
    return state[n];
  }

  this.shift = function (e) {
    state[ptr] = e;
    ptr = (ptr + 1) % ceil;
  }
}

function repeat(e, n) {
  var r = [];
  for (var i = 0; i < n; i++) {
    r.push(e);
  }
  return r;
}

function trivium_gen(key, iv) {
  var stream_bit = -1152; // the first bits are weak, remember?
  var key = string_to_bits(key).slice(0, 80);
  var iv = string_to_bits(iv).slice(0, 80);

  var A = new shifter(repeat(0, 93 - key.length).concat(key));
  var B = new shifter(repeat(0, 84 - iv.length).concat(iv));
  var C = new shifter(repeat(1, 3).concat(repeat(0, 111 - 3)));

  this.nextbit = function () {
    var bit = C.get(-66) ^ C.get(-111) ^
      A.get(-66) ^ A.get(-93) ^
      B.get(-69) ^ B.get(-84);

    var A_in = C.get(-66) ^ C.get(-111) ^
      C.get(-110) & C.get(-109) ^
      A.get(-69);

    var B_in = A.get(-66) ^ A.get(-93) ^
      A.get(-92) & A.get(-91) ^
      B.get(-78);

    var C_in = B.get(-69) ^ B.get(-84) ^
      B.get(-83) & B.get(-82) ^
      C.get(-87);

    A.shift(A_in);
    B.shift(B_in);
    C.shift(C_in);

    stream_bit++;
    return bit;
  }

  this.nextpoint = function () {
    var bits = [];
    for (var b = 0; b < 16; b++) {
      bits[b] = this.nextbit();
    }
    return bits_to_point(bits);
  }

  // but first, fast forward to the real bits:
  while (stream_bit < 0) {
    this.nextbit();
  }
}


function encrypt(key, iv, s) {
  s = string_to_points(s);
  var plain = [];
  var T = new trivium_gen(key, iv);
  for (var point = 0; point < s.length; point++) {
    plain[point] = s[point] ^ T.nextpoint();
  }
  return plain;
}

// Now some unsexy (and under-optimized) stuff for
// bits <-> codepoints <-> string conversion.

function string_to_points(str) {
  var points = [];
  for (var p = 0; p < str.length; p++) {
    points[p] = str.charCodeAt(p);
  }
  return points;
}

function points_to_string(points) {
  return String.fromCharCode.apply(null, points);
}

function bits_to_point(bits) {
  var point = 0;
  for (var i = 0; i < 16; i++) {
    if (bits[i])
      point += (2 << i) / 2;
  }
  return point;
}

function point_to_bits(point) {
  var bits = [];
  for (var i = 0; i < 16; i++) {
    bits.push((point >> i) % 2);
  }
  return bits;
}

function string_to_bits(s) {
  return points_to_bits(string_to_points(s));
}

function points_to_bits(pts) {
  bits = [];
  for (var p = 0; p < pts.length; p++) {
    bits = bits.concat(point_to_bits(pts[p]));
  }
  return bits;
}