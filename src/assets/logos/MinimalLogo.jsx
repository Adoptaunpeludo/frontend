import PropTypes from 'prop-types';

export const MinimalLogo = ({ size = 100, color = "#3E73C7" }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 311.000000 319.000000"
      preserveAspectRatio="xMidYMid meet"
      style={{
        backgroundColor: "white",
        borderRadius: "50%",
        border: `5px solid ${color}`,
      }}
    >
      <g
        transform="translate(0.000000,319.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M780 2801 c-46 -15 -91 -42 -131 -78 -117 -106 -132 -307 -34 -436
45 -59 168 -122 270 -138 137 -21 317 19 453 101 37 22 68 37 71 34 9 -9 -109
-120 -162 -152 -28 -17 -81 -39 -117 -48 -62 -16 -70 -15 -202 6 -183 29 -247
17 -327 -62 -86 -83 -142 -208 -177 -394 -25 -134 -15 -386 20 -512 14 -51 32
-105 40 -119 12 -25 14 -20 18 64 6 134 43 203 186 348 64 66 118 130 131 158
46 94 37 170 -26 233 l-34 35 28 -7 c15 -3 56 -19 91 -35 170 -77 249 -263
184 -434 -13 -34 -65 -120 -122 -199 -122 -171 -135 -201 -135 -326 0 -88 3
-101 33 -163 47 -94 116 -159 227 -212 131 -63 204 -79 365 -79 127 0 139 2
197 28 66 30 143 102 143 134 0 9 -7 27 -15 39 -15 21 -14 23 12 28 59 13 114
38 128 58 8 12 15 41 15 65 0 34 -6 49 -28 71 -15 15 -33 30 -41 32 -10 4 -7
13 14 34 24 26 26 36 22 78 -5 56 -29 94 -78 122 -31 18 -34 23 -26 46 20 54
-44 129 -110 129 -16 0 -61 -16 -102 -35 -115 -55 -219 -43 -300 35 -34 33
-89 119 -79 123 52 25 63 36 66 59 3 24 -1 27 -30 30 l-33 3 56 42 c48 35 63
55 105 139 52 104 91 144 143 144 57 1 103 41 166 144 33 55 64 100 69 100 9
1 16 -20 61 -176 16 -56 18 -58 50 -58 31 0 37 6 89 88 30 48 66 101 80 117
l24 30 21 -48 c36 -84 54 -159 60 -252 l6 -90 55 -28 c51 -26 62 -28 145 -25
101 5 192 37 239 86 29 31 141 261 149 309 9 49 0 63 -42 63 -37 0 -101 32
-101 50 0 5 17 10 38 10 43 0 62 14 62 47 0 30 -36 47 -231 112 -228 76 -285
114 -390 262 -100 142 -298 219 -523 205 -359 -23 -411 -19 -542 39 -62 27
-153 40 -194 26z"
        />
        <path
          d="M1653 1859 c-38 -66 -39 -69 -15 -69 38 0 53 23 50 75 l-3 50 -32
-56z"
        />
        <path
          d="M1938 1832 c-27 -40 -48 -77 -48 -81 0 -10 88 -36 96 -29 2 3 3 46 2
94 l-3 89 -47 -73z"
        />
        <path
          d="M2202 1422 c-64 -23 -99 -54 -124 -110 -21 -47 -17 -78 13 -87 15 -5
17 -10 9 -25 -6 -10 -10 -37 -10 -59 0 -31 6 -44 26 -60 15 -12 35 -21 44 -21
16 0 17 -5 9 -37 -15 -67 -12 -103 10 -103 16 0 21 -9 26 -47 19 -135 50 -173
143 -173 111 0 207 72 254 189 18 46 22 76 23 166 0 106 -1 113 -36 185 -64
132 -142 190 -264 197 -51 3 -84 -2 -123 -15z"
        />
      </g>
    </svg>
  );
};

MinimalLogo.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};