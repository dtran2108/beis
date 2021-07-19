var styledMapType = new google.maps.StyledMapType(
  [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
          "color": "#f1e6db"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{
          "color": "#f3ede7"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
          "saturation": 36
        },
        {
          "color": "#333333"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    }
  ], {
    name: 'Styled Map'
  });

var locations = [
  ['<p><strong>NORDSTROM - SOUTHCENTER</strong></p><p>100 Southcenter Shopping Center<br>Tukwila, WA 98188</p><p>T: 206-246-0400</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=100+Southcenter+Shopping+Center+Tukwila+WA+98188\' target=\'_blank\'>Get Directions</a></p>', 47.4595829, -122.2607458, 'nordstrom'],
  ['<p><strong>NORDSTROM - PARK MEADOWS</strong></p><p>8465 Park Meadows Center Drive<br>Lone Tree, CO 80124</p><p>T: 303-799-3400</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8465+Park+Meadows+Center+Drive+Lone+Tree+CO+80124\' target=\'_blank\'>Get Directions</a></p>', 39.5616325, -104.8749283, 'nordstrom'],
  ['<p><strong>NORDSTROM - FLATIRON XING</strong></p><p>21 W. Flatiron Crossing Drive<br>Broomfield, CO 80021</p><p>T: 720-887-0333</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=21+W+Flatiron+Crossing+Drive+Broomfield+CO+80021\' target=\'_blank\'>Get Directions</a></p>', 39.9329303, -105.1331788, 'nordstrom'],
  ['<p><strong>NORDSTROM - CHERRY CREEK</strong></p><p>2810 E. 1st Avenue<br>Denver, CO 80206</p><p>T: 720-746-2424</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2810+E+1st+Avenue+Denver+CO+80206\' target=\'_blank\'>Get Directions</a></p>', 39.7172026, -104.9550336, 'nordstrom'],
  ['<p><strong>NORDSTROM - CITY CREEK CTR</strong></p><p>55 S.W. Temple<br>Salt Lake City, UT 84101</p><p>T: 801-322-4200</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=55+SW+Temple+Salt+Lake+City+UT+84101\' target=\'_blank\'>Get Directions</a></p>', 40.7683752, -111.8932414, 'nordstrom'],
  ['<p><strong>NORDSTROM - OLD ORCHARD</strong></p><p>4937 Old Orchard Shopping Center<br>Skokie, IL 60077</p><p>T: 847-677-2121</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4937+Old+Orchard+Shopping+Center+Skokie+IL+60077\' target=\'_blank\'>Get Directions</a></p>', 42.0608614, -87.7490925, 'nordstrom'],
  ['<p><strong>NORDSTROM - WOODFIELD MALL</strong></p><p>6 Woodfield Shopping Cenyer<br>Schaumburg, IL 60173</p><p>T: 847-605-2121</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6+Woodfield+Shopping+Cenyer+Schaumburg+IL+60173\' target=\'_blank\'>Get Directions</a></p>', 42.0454143, -88.0401296, 'nordstrom'],
  ['<p><strong>NORDSTROM - BEACHWOOD PLACE</strong></p><p>26200 Cedar Road<br>Beachwood, OH 44122</p><p>T: 216-378-2121</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=26200+Cedar+Road+Beachwood+OH+44122\' target=\'_blank\'>Get Directions</a></p>', 41.497625, -81.495192, 'nordstrom'],
  ['<p><strong>NORDSTROM - SOMERSET NORTH</strong></p><p>2850 W. Big Beaver Road<br>Troy, MI 48084</p><p>T: 248-816-5100</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2850+W+Big+Beaver+Road+Troy+MI+48084\' target=\'_blank\'>Get Directions</a></p>', 42.56271, -83.185822, 'nordstrom'],
  ['<p><strong>NORDSTROM - OAK PARK MALL</strong></p><p>11143 W. 95th Street<br>Overland Park, KS 66214</p><p>T: 913-492-8111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11143+W+95th+Street+Overland+Park+KS+66214\' target=\'_blank\'>Get Directions</a></p>', 38.952353, -94.7184947, 'nordstrom'],
  ['<p><strong>NORDSTROM - WEST COUNTY</strong></p><p>47 W. County Center<br>Des Peres, MO 63131</p><p>T: 314-255-2000</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=47+W+County+Center+Des+Peres+MO+63131\' target=\'_blank\'>Get Directions</a></p>', 38.6008034, -90.44764, 'nordstrom'],
  ['<p><strong>NORDSTROM - EASTON</strong></p><p>4000 Worth Avenue<br>Columbus, OH 43219</p><p>T: 614-416-7111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4000+Worth+Avenue+Columbus+OH+43219\' target=\'_blank\'>Get Directions</a></p>', 40.0547013, -82.9150689, 'nordstrom'],
  ['<p><strong>NORDSTROM - SAINT LOUIS</strong></p><p>1453 St. Louis Galleria<br>Saint Louis, MO 63117</p><p>T: 314-884-4900</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1453+St+Louis+Galleria+Saint+Louis+MO+63117\' target=\'_blank\'>Get Directions</a></p>', 38.6347959, -90.34733, 'nordstrom'],
  ['<p><strong>NORDSTROM - RIDGEDALE CENTR</strong></p><p>12441 Wayzata Boulevard<br>Minnetonka, MN 55305</p><p>T: 651-900-6800</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=12441+Wayzata+Boulevard+Minnetonka+MN+55305\' target=\'_blank\'>Get Directions</a></p>', 44.9686594, -93.4352163, 'nordstrom'],
  ['<p><strong>NORDSTROM - BREA MALL</strong></p><p>500 Brea Mall Way<br>Brea, CA 92821</p><p>T: 714-529-0123</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=500+Brea+Mall+Way+Brea+CA+92821\' target=\'_blank\'>Get Directions</a></p>', 33.9158494, -117.8881709, 'nordstrom'],
  ['<p><strong>NORDSTROM - TYLER</strong></p><p>3601 The Galleria at Tyler<br>Riverside, CA 92503</p><p>T: 951-351-3170</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3601+The+Galleria+at+Tyler+Riverside+CA+92503\' target=\'_blank\'>Get Directions</a></p>', 33.9096174, -117.458365, 'nordstrom'],
  ['<p><strong>NORDSTROM - MISSION VIEJO</strong></p><p>100 The Shops at Mission Viejo Mission<br>Viejo, CA 92691</p><p>T: 949-347-2710</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=100+The+Shops+at+Mission+Viejo+Mission+Viejo+CA+92691\' target=\'_blank\'>Get Directions</a></p>', 33.5594497, -117.6678744, 'nordstrom'],
  ['<p><strong>NORDSTROM - IRVINE SPECTRUM</strong></p><p>800 Spectrum Center Drive<br>Irvine, CA 92618</p><p>T: 949-255-2800</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=800+Spectrum+Center+Drive+Irvine+CA+92618\' target=\'_blank\'>Get Directions</a></p>', 33.6484984, -117.7427271, 'nordstrom'],
  ['<p><strong>NORDSTROM - DEL AMO FSH CTR</strong></p><p>21500 Hawthorne Boulevard<br>Torrance, CA 90503</p><p>T: 310-542-9440</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=21500+Hawthorne+Boulevard+Torrance+CA+90503\' target=\'_blank\'>Get Directions</a></p>', 33.834714, -118.3507605, 'nordstrom'],
  ['<p><strong>NORDSTROM - THE OAKS</strong></p><p>346 W. Hillcrest Drive<br>Thousand Oaks, CA 91360</p><p>T: 805-418-4500</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=346+W+Hillcrest+Drive+Thousand+Oaks+CA+91360\' target=\'_blank\'>Get Directions</a></p>', 34.1836885, -118.8887469, 'nordstrom'],
  ['<p><strong>NORDSTROM - ESCONDIDO</strong></p><p>270 E. Via Rancho Parkway<br>Escondido, CA 92025</p><p>T: 760-740-0170</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=270+E+Via+Rancho+Parkway+Escondido+CA+92025\' target=\'_blank\'>Get Directions</a></p>', 33.0710017, -117.0659313, 'nordstrom'],
  ['<p><strong>NORDSTROM - FASHION SQUARE</strong></p><p>7055 E. Camelback Road<br>Scottsdale, AZ 85251</p><p>T: 480-946-4111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7055+E+Camelback+Road+Scottsdale+AZ+85251\' target=\'_blank\'>Get Directions</a></p>', 33.5017764, -111.9291509, 'nordstrom'],
  ['<p><strong>NORDSTROM - CHANDLER CTR</strong></p><p>3199 W. Chandler Boulevard<br>Chandler, AZ 85226</p><p>T: 480-855-2500</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3199+W+Chandler+Boulevard+Chandler+AZ+85226\' target=\'_blank\'>Get Directions</a></p>', 33.3027928, -111.9004215, 'nordstrom'],
  ['<p><strong>NORDSTROM - FASHION SHOW</strong></p><p>3200 Las Vegas Boulevard S<br>Las Vegas, NV 89109</p><p>T: 702-862-2525</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3200+Las+Vegas+Boulevard+S+Las+Vegas+NV+89109\' target=\'_blank\'>Get Directions</a></p>', 36.1276582, -115.1679772, 'nordstrom'],
  ['<p><strong>NORDSTROM - HILLSDALE</strong></p><p>130 Hillsdale Shopping Center<br>San Mateo, CA 94403</p><p>T: 650-570-5111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=130+Hillsdale+Shopping+Center+San+Mateo+CA+94403\' target=\'_blank\'>Get Directions</a></p>', 37.5376426, -122.301675, 'nordstrom'],
  ['<p><strong>NORDSTROM - PALO ALTO</strong></p><p>550 Stanford Shopping Center<br>Palo Alto, CA 94304</p><p>T: 650-323-5111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=550+Stanford+Shopping+Center+Palo+Alto+CA+94304\' target=\'_blank\'>Get Directions</a></p>', 37.4394661, -122.1739601, 'nordstrom'],
  ['<p><strong>NORDSTROM - VALLEY FAIR</strong></p><p>2400 Forest Avenue<br>San Jose, CA 95128</p><p>T: 408-248-2180</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2400+Forest+Avenue+San+Jose+CA+95128\' target=\'_blank\'>Get Directions</a></p>', 37.3262359, -121.9470976, 'nordstrom'],
  ['<p><strong>NORDSTROM - SAN FRANCISCO</strong></p><p>865 Market Street<br>San Francisco, CA 94103</p><p>T: 415-243-8500</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=865+Market+Street+San+Francisco+CA+94103\' target=\'_blank\'>Get Directions</a></p>', 37.7839663, -122.4075291, 'nordstrom'],
  ['<p><strong>NORDSTROM - ARDEN FAIR</strong></p><p>1651 Arden Way<br>Sacramento, CA 95815</p><p>T: 916-646-2400</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1651+Arden+Way+Sacramento+CA+95815\' target=\'_blank\'>Get Directions</a></p>', 38.6022574, -121.4267803, 'nordstrom'],
  ['<p><strong>NORDSTROM - STONERIDGE</strong></p><p>1600 Stoneridge Mall Road<br>Pleasanton, CA 94588</p><p>T: 925-463-5050</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1600+Stoneridge+Mall+Road+Pleasanton+CA+94588\' target=\'_blank\'>Get Directions</a></p>', 37.6959141, -121.9283858, 'nordstrom'],
  ['<p><strong>NORDSTROM - GALLERIA</strong></p><p>1131 Galleria Boulevard<br>Roseville, CA 95678</p><p>T: 916-780-7300</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1131+Galleria+Boulevard+Roseville+CA+95678\' target=\'_blank\'>Get Directions</a></p>', 38.7717514, -121.2686342, 'nordstrom'],
  ['<p><strong>NORDSTROM - GARDEN STATE</strong></p><p>501 Garden State Plaza<br>Paramus, NJ 7652</p><p>T: 201-843-1122</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=501+Garden+State+Plaza+Paramus+NJ+7652\' target=\'_blank\'>Get Directions</a></p>', 40.9197819, -74.075725, 'nordstrom'],
  ['<p><strong>NORDSTROM - MENLO PARK</strong></p><p>449 Menlo Park Drive<br>Edison, NJ 8837</p><p>T: 732-603-5000</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=449+Menlo+Park+Drive+Edison+NJ+8837\' target=\'_blank\'>Get Directions</a></p>', 40.5496551, -74.3363588, 'nordstrom'],
  ['<p><strong>NORDSTROM - FREEHOLD</strong></p><p>3710 US Highway 9<br>Freehold, NJ 7728</p><p>T: 732-308-1117</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3710+US+Highway+9+Freehold+NJ+7728\' target=\'_blank\'>Get Directions</a></p>', 40.2546296, -74.298621, 'nordstrom'],
  ['<p><strong>NORDSTROM - THE WESTCHESTER</strong></p><p>135 Westchester Avenue<br>White Plains, NY 10601</p><p>T: 914-946-1122</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=135+Westchester+Avenue+White+Plains+NY+10601\' target=\'_blank\'>Get Directions</a></p>', 41.0323419, -73.758951, 'nordstrom'],
  ['<p><strong>NORDSTROM - ROOSEVELT FIELD</strong></p><p>630 Old Country Road<br>Garden City, NY 11530</p><p>T: 516-746-0011</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=630+Old+Country+Road+Garden+City+NY+11530\' target=\'_blank\'>Get Directions</a></p>', 40.7382095, -73.6143694, 'nordstrom'],
  ['<p><strong>NORDSTROM - WESTFARMS</strong></p><p>600 Westfarms Mall<br>Farmington, CT 6032</p><p>T: 860-521-9090</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=600+Westfarms+Mall+Farmington+CT+6032\' target=\'_blank\'>Get Directions</a></p>', 41.7222234, -72.7625717, 'nordstrom'],
  ['<p><strong>NORDSTROM - SHORT HILLS</strong></p><p>1200 Morris Turnpike<br>Short Hills, NJ 7078</p><p>T: 973-467-1500</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1200+Morris+Turnpike+Short+Hills+NJ+7078\' target=\'_blank\'>Get Directions</a></p>', 40.7408743, -74.3642457, 'nordstrom'],
  ['<p><strong>NORDSTROM - NATICK</strong></p><p>290 Speen Street<br>Natick, MA 1760</p><p>T: 508-318-2600</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=290+Speen+Street+Natick+MA+1760\' target=\'_blank\'>Get Directions</a></p>', 42.3025964, -71.3827764, 'nordstrom'],
  ['<p><strong>NORDSTROM - SOUTH SHORE PLZ</strong></p><p>250 Granite Street Suite 227<br>Braintree, MA 2184</p><p>T: 781-519-7200</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=250+Granite+Street+Suite+227+Braintree+MA+2184\' target=\'_blank\'>Get Directions</a></p>', 42.222063, -71.0231303, 'nordstrom'],
  ['<p><strong>NORDSTROM - BURLINGTON</strong></p><p>75 Middlesex Turnpike<br>Burlington, MA 1803</p><p>T: 781-345-7800</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=75+Middlesex+Turnpike+Burlington+MA+1803\' target=\'_blank\'>Get Directions</a></p>', 42.4824802, -71.2137008, 'nordstrom'],
  ['<p><strong>NORDSTROM - TYSONS CORNER</strong></p><p>8075 Tysons Corner Center<br>McLean, VA 22102</p><p>T: 703-761-1121</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8075+Tysons+Corner+Center+McLean+VA+22102\' target=\'_blank\'>Get Directions</a></p>', 38.9167911, -77.2222052, 'nordstrom'],
  ['<p><strong>NORDSTROM - TOWSON CENTER</strong></p><p>700 Fairmount Avenue<br>Towson, MD 21286</p><p>T: 410-296-2111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=700+Fairmount+Avenue+Towson+MD+21286\' target=\'_blank\'>Get Directions</a></p>', 39.403648, -76.597473, 'nordstrom'],
  ['<p><strong>NORDSTROM - MONTGOMERY</strong></p><p>7111 Democracy Boulevard<br>Bethesda, MD 20817</p><p>T: 301-365-4111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7111+Democracy+Boulevard+Bethesda+MD+20817\' target=\'_blank\'>Get Directions</a></p>', 39.0228868, -77.1457204, 'nordstrom'],
  ['<p><strong>NORDSTROM - KING OF PRUSSIA</strong></p><p>190 N. Gulph Road<br>King of Prussia, PA 19406</p><p>T: 610-265-6111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=190+N+Gulph+Road+King+of+Prussia+PA+19406\' target=\'_blank\'>Get Directions</a></p>', 40.0865922, -75.3921854, 'nordstrom'],
  ['<p><strong>NORDSTROM - COLUMBIA</strong></p><p>10300 Little Patuxent Parkway<br>Columbia, MD 21044</p><p>T: 410-715-2222</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10300+Little+Patuxent+Parkway+Columbia+MD+21044\' target=\'_blank\'>Get Directions</a></p>', 39.2155908, -76.8611782, 'nordstrom'],
  ['<p><strong>NORDSTROM - CHERRY HILL</strong></p><p>2000 Route 38<br>Cherry Hill, NJ 8002</p><p>T: 856-773-5600</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2000+Route+38+Cherry+Hill+NJ+8002\' target=\'_blank\'>Get Directions</a></p>', 39.94086, -75.0257016, 'nordstrom'],
  ['<p><strong>NORDSTROM - CHRISTIANA</strong></p><p>100 Christiana Mall<br>Newark, DE 19702</p><p>T: 302-613-6000</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=100+Christiana+Mall+Newark+DE+19702\' target=\'_blank\'>Get Directions</a></p>', 39.6805222, -75.6529606, 'nordstrom'],
  ['<p><strong>NORDSTROM - ALA MOANA</strong></p><p>1450 Ala Moana Boulevard Suite 2950<br>Honolulu, HI 96814</p><p>T: 808-953-6100</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1450+Ala+Moana+Boulevard+Suite+2950+Honolulu+HI+96814\' target=\'_blank\'>Get Directions</a></p>', 21.2921372, -157.8465927, 'nordstrom'],
  ['<p><strong>NORDSTROM - DALLAS GALLERIA</strong></p><p>5220 Alpha Road<br>Dallas, TX 75240</p><p>T: 972-702-0055</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5220+Alpha+Road+Dallas+TX+75240\' target=\'_blank\'>Get Directions</a></p>', 32.9326077, -96.8199023, 'nordstrom'],
  ['<p><strong>NORDSTROM - NORTHPARK</strong></p><p>8687 N. Central Expressway<br>Dallas, TX 75225</p><p>T: 214-231-3900</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8687+N+Central+Expressway+Dallas+TX+75225\' target=\'_blank\'>Get Directions</a></p>', 32.8685653, -96.7738492, 'nordstrom'],
  ['<p><strong>NORDSTROM - STONEBRIAR MALL</strong></p><p>2613 Preston Road<br>Frisco, TX 75034</p><p>T: 972-712-3794</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2613+Preston+Road+Frisco+TX+75034\' target=\'_blank\'>Get Directions</a></p>', 33.1000283, -96.8121572, 'nordstrom'],
  ['<p><strong>NORDSTROM - HOUSTON GALLERI</strong></p><p>5192 Hidalgo Street<br>Houston, TX 77056</p><p>T: 832-201-2700</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5192+Hidalgo+Street+Houston+TX+77056\' target=\'_blank\'>Get Directions</a></p>', 29.7359134, -95.4641839, 'nordstrom'],
  ['<p><strong>NORDSTROM - LA CANTERA</strong></p><p>15900 La Cantera Parkway<br>San Antonio, TX 78256</p><p>T: 210-332-1900</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15900+La+Cantera+Parkway+San+Antonio+TX+78256\' target=\'_blank\'>Get Directions</a></p>', 29.5935398, -98.6145043, 'nordstrom'],
  ['<p><strong>NORDSTROM - WOODLANDS MALL</strong></p><p>1201 Lake Woodlands Drive<br>Woodlands, TX 77380</p><p>T: 832-562-4880</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1201+Lake+Woodlands+Drive+Woodlands+TX+77380\' target=\'_blank\'>Get Directions</a></p>', 30.1645185, -95.4538295, 'nordstrom'],
  ['<p><strong>NORDSTROM - SOUTHPARK</strong></p><p>4400 Sharon Road<br>Charlotte, NC 28211</p><p>T: 704-442-6000</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4400+Sharon+Road+Charlotte+NC+28211\' target=\'_blank\'>Get Directions</a></p>', 35.1522311, -80.8318968, 'nordstrom'],
  ['<p><strong>NORDSTROM - SOUTHPOINT</strong></p><p>6910 Fayetteville Road Suite 500<br>Durham, NC 27713</p><p>T: 919-806-3700</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6910+Fayetteville+Road+Suite+500+Durham+NC+27713\' target=\'_blank\'>Get Directions</a></p>', 35.9052172, -78.9439388, 'nordstrom'],
  ['<p><strong>NORDSTROM - PERIMETER MALL</strong></p><p>4390 Ashford Dunwoody Road NE<br>Atlanta, GA 30346</p><p>T: 770-394-1141</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4390+Ashford+Dunwoody+Road+NE+Atlanta+GA+30346\' target=\'_blank\'>Get Directions</a></p>', 33.9239849, -84.340706, 'nordstrom'],
  ['<p><strong>NORDSTROM - BOCA RATON</strong></p><p>5820 Glades Road<br>Boca Raton, FL 33431</p><p>T: 561-620-5555</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5820+Glades+Road+Boca+Raton+FL+33431\' target=\'_blank\'>Get Directions</a></p>', 26.3660995, -80.1332252, 'nordstrom'],
  ['<p><strong>NORDSTROM - MERRICK PARK</strong></p><p>4310 Ponce de Leon Boulevard<br>Coral Gables, FL 33146</p><p>T: 786-999-1313</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4310+Ponce+de+Leon+Boulevard+Coral+Gables+FL+33146\' target=\'_blank\'>Get Directions</a></p>', 25.73174, -80.2589553, 'nordstrom'],
  ['<p><strong>NORDSTROM - INTERNATL PLAZA</strong></p><p>2223 N. Westshore Boulevard<br>Tampa, FL 33607</p><p>T: 813-875-4400</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2223+N+Westshore+Boulevard+Tampa+FL+33607\' target=\'_blank\'>Get Directions</a></p>', 27.9656353, -82.521205, 'nordstrom'],
  ['<p><strong>NORDSTROM - DADELAND</strong></p><p>7239 N. Kendal Drive<br>Miami, FL 33156</p><p>T: 786-709-4100</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7239+N+Kendal+Drive+Miami+FL+33156\' target=\'_blank\'>Get Directions</a></p>', 25.6897116, -80.3102342, 'nordstrom'],
  ['<p><strong>NORDSTROM - PHIPPS PLAZA</strong></p><p>3500 Peachtree Road NE<br>Atlanta, GA 30326</p><p>T: 404-442-3000</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3500+Peachtree+Road+NE+Atlanta+GA+30326\' target=\'_blank\'>Get Directions</a></p>', 33.8528035, -84.3622556, 'nordstrom'],
  ['<p><strong>NORDSTROM - AVENTURA</strong></p><p>19507 Biscayne Boulevard<br>Aventura, FL 33180</p><p>T: 305-356-6900</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=19507+Biscayne+Boulevard+Aventura+FL+33180\' target=\'_blank\'>Get Directions</a></p>', 25.957111, -80.145023, 'nordstrom'],
  ['<p><strong>NORDSTROM - ST JOHN TWN CTR</strong></p><p>4835 Town Crossing Drive<br>Jacksonville, FL 32246</p><p>T: 904-672-2200</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4835+Town+Crossing+Drive+Jacksonville+FL+32246\' target=\'_blank\'>Get Directions</a></p>', 30.2536852, -81.5268509, 'nordstrom'],
  ['<p><strong>NORDSTROM - CALGARY</strong></p><p>6455 Macleod Trail SW # 2150 Calgary<br>AB, CAN T2H 0K8</p><p>T: (587) 291-2000 Tie-Line 8-930-0111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6455+Macleod+Trail+SW+#+2150+Calgary+AB+CAN+T2H+0K8\' target=\'_blank\'>Get Directions</a></p>', 50.9978823, -114.0740046, 'nordstrom'],
  ['<p><strong>NORDSTROM - OTTOWA</strong></p><p>50 Rideau Street # 500 Ottawa<br>ON, CAN K1N 9J7</p><p>T: (613)-567-7005 Tie-line 8-931-0111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=50+Rideau+Street+#+500+Ottawa+ON+CAN+K1N+9J7\' target=\'_blank\'>Get Directions</a></p>', 45.4247623, -75.6900945, 'nordstrom'],
  ['<p><strong>NORDSTROM - SHERWAY</strong></p><p>25 The West Mall Etobicoke<br>ON, CAN M9C 1B8</p><p>T: (647) 798-4200 Tie-Line 8-933-0111</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=25+The+West+Mall+Etobicoke+ON+CAN+M9C+1B8\' target=\'_blank\'>Get Directions</a></p>', 43.6116933, -79.557183, 'nordstrom'],
  ['<p><strong>Ulta - KENNESAW #25</strong></p><p>680 Barrett Parkway<br>Kennesaw, GA 30144</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=680+Barrett+Parkway+Kennesaw+GA+30144\' target=\'_blank\'>Get Directions</a></p>', 34.0086653, -84.5737265, 'ulta'],
  ['<p><strong>Ulta - HOBART #41</strong></p><p>2395 E. 81st Avenue<br>Merrillville, IN 46410</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2395+E+81st+Avenue+Merrillville+IN+46410\' target=\'_blank\'>Get Directions</a></p>', 41.4718209, -87.3072823, 'ulta'],
  ['<p><strong>Ulta - PRESTON & FOREST #42</strong></p><p>11661 Preston Road<br>Dallas, TX 75230</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11661+Preston+Road+Dallas+TX+75230\' target=\'_blank\'>Get Directions</a></p>', 32.908123, -96.805437, 'ulta'],
  ['<p><strong>Ulta - SMYRNA #43</strong></p><p>2540 Cumberland Blvd.<br>Smyrna, GA 30080</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2540+Cumberland+Blvd+Smyrna+GA+30080\' target=\'_blank\'>Get Directions</a></p>', 33.8885479, -84.4777318, 'ulta'],
  ['<p><strong>Ulta - CLARK & WELLINGTON #44</strong></p><p>3015 N. Clark St.<br>Chicago, IL 60657</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3015+N+Clark+St+Chicago+IL+60657\' target=\'_blank\'>Get Directions</a></p>', 41.9370839, -87.6475528, 'ulta'],
  ['<p><strong>Ulta - PATCHOGUE #66</strong></p><p>499 Sunrise Highway<br>Patchogue, NY 11772</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=499+Sunrise+Highway+Patchogue+NY+11772\' target=\'_blank\'>Get Directions</a></p>', 40.7775623, -73.0385352, 'ulta'],
  ['<p><strong>Ulta - GURNEE #67</strong></p><p>6517 Grand Avenue<br>Gurnee, IL 60031</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6517+Grand+Avenue+Gurnee+IL+60031\' target=\'_blank\'>Get Directions</a></p>', 42.3851928, -87.9639658, 'ulta'],
  ['<p><strong>Ulta - AUSTIN - GATEWAY #75</strong></p><p>9607 Research Blvd.<br>Austin, TX 78759</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9607+Research+Blvd+Austin+TX+78759\' target=\'_blank\'>Get Directions</a></p>', 30.3896271, -97.7428645, 'ulta'],
  ['<p><strong>Ulta - Humble #83</strong></p><p>20530 US Highway 59 North<br>Humble, TX 77338</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=20530+US+Highway+59+North+Humble+TX+77338\' target=\'_blank\'>Get Directions</a></p>', 30.0151057, -95.2613837, 'ulta'],
  ['<p><strong>Ulta - FAIRLESS HILLS #84</strong></p><p>146 Commerce Blvd.<br>Fairless Hills, PA 19030</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=146+Commerce+Blvd+Fairless+Hills+PA+19030\' target=\'_blank\'>Get Directions</a></p>', 40.1852046, -74.8652417, 'ulta'],
  ['<p><strong>Ulta - WILMINGTON #86</strong></p><p>4803 Concord Pike<br>Wilmington, DE 19803</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4803+Concord+Pike+Wilmington+DE+19803\' target=\'_blank\'>Get Directions</a></p>', 39.8261195, -75.5428866, 'ulta'],
  ['<p><strong>Ulta - ROUND ROCK #91</strong></p><p>2701 Parker Road<br>Round Rock, TX 78681</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2701+Parker+Road+Round+Rock+TX+78681\' target=\'_blank\'>Get Directions</a></p>', 30.4814692, -97.6787899, 'ulta'],
  ['<p><strong>Ulta - HURST #94</strong></p><p>880 NE Mall Blvd.<br>Hurst, TX 76053</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=880+NE+Mall+Blvd+Hurst+TX+76053\' target=\'_blank\'>Get Directions</a></p>', 32.8264036, -97.2005385, 'ulta'],
  ['<p><strong>Ulta - LAS VEGAS-SILVERADO RANCH #100</strong></p><p>9857 S. Eastern Avenue<br>Las Vegas, NV 89183</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9857+S+Eastern+Avenue+Las+Vegas+NV+89183\' target=\'_blank\'>Get Directions</a></p>', 36.0101643, -115.1221664, 'ulta'],
  ['<p><strong>Ulta - WOODSTOCK #105</strong></p><p>124 Woodstock Square Ave.<br>Woodstock, GA 30189</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=124+Woodstock+Square+Ave+Woodstock+GA+30189\' target=\'_blank\'>Get Directions</a></p>', 34.08332, -84.546434, 'ulta'],
  ['<p><strong>Ulta - DESERT RIDGE #108</strong></p><p>21001 N. Tatum Blvd.<br>Phoenix, AZ 85050</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=21001+N+Tatum+Blvd+Phoenix+AZ+85050\' target=\'_blank\'>Get Directions</a></p>', 33.6742826, -111.97447, 'ulta'],
  ['<p><strong>Ulta - ELK GROVE #110</strong></p><p>9141 West Stockton Blvd.<br>Elk Grove, CA 95758</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9141+West+Stockton+Blvd+Elk+Grove+CA+95758\' target=\'_blank\'>Get Directions</a></p>', 38.425184, -121.3998708, 'ulta'],
  ['<p><strong>Ulta - CHICAGO- N. CLYBOURN  #121</strong></p><p>2754 N. Clybourn Ave<br>Chicago, IL 60614</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2754+N+Clybourn+Ave+Chicago+IL+60614\' target=\'_blank\'>Get Directions</a></p>', 41.9310609, -87.6771111, 'ulta'],
  ['<p><strong>Ulta - COON RAPIDS #122</strong></p><p>3583 River Rapids Drive<br>Coon Rapids, MN 55448</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3583+River+Rapids+Drive+Coon+Rapids+MN+55448\' target=\'_blank\'>Get Directions</a></p>', 45.1993813, -93.3558701, 'ulta'],
  ['<p><strong>Ulta - CITRUS HEIGHTS #124</strong></p><p>5927 Sunrise Blvd.<br>Citrus Heights, CA 95610</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5927+Sunrise+Blvd+Citrus+Heights+CA+95610\' target=\'_blank\'>Get Directions</a></p>', 38.673729, -121.273078, 'ulta'],
  ['<p><strong>Ulta - HOLMDEL #125</strong></p><p>2130 Route 35 South<br>Holmdel, NJ 07733</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2130+Route+35+South+Holmdel+NJ+07733\' target=\'_blank\'>Get Directions</a></p>', 40.4106152, -74.1462001, 'ulta'],
  ['<p><strong>Ulta - CARY #126</strong></p><p>409 Crossroads Blvd.<br>Cary, NC 27511</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=409+Crossroads+Blvd+Cary+NC+27511\' target=\'_blank\'>Get Directions</a></p>', 35.7615528, -78.7356202, 'ulta'],
  ['<p><strong>Ulta - CHARLOTTE #134</strong></p><p>7844 Rea Road<br>Charlotte, NC 28277</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7844+Rea+Road+Charlotte+NC+28277\' target=\'_blank\'>Get Directions</a></p>', 35.0604382, -80.8169734, 'ulta'],
  ['<p><strong>Ulta - OCEANSIDE #135</strong></p><p>2645 Vista Way Retail<br>Oceanside, CA 92054</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2645+Vista+Way+Retail+Oceanside+CA+92054\' target=\'_blank\'>Get Directions</a></p>', 33.1827891, -117.3296491, 'ulta'],
  ['<p><strong>Ulta - HUNT VALLEY #139</strong></p><p>118 Shawan Road<br>Hunt Valley, MD 21030</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=118+Shawan+Road+Hunt+Valley+MD+21030\' target=\'_blank\'>Get Directions</a></p>', 39.4978495, -76.6554846, 'ulta'],
  ['<p><strong>Ulta - PASADENA  #143</strong></p><p>3393 E. Foothill Blvd.<br>Pasadena, CA 91107</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3393+E+Foothill+Blvd+Pasadena+CA+91107\' target=\'_blank\'>Get Directions</a></p>', 34.1525397, -118.0800708, 'ulta'],
  ['<p><strong>Ulta - HOUSTON #149</strong></p><p>5140 Richmond Avenue<br>Houston, TX 77056</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5140+Richmond+Avenue+Houston+TX+77056\' target=\'_blank\'>Get Directions</a></p>', 29.732856, -95.4650439, 'ulta'],
  ['<p><strong>Ulta - HOUSTON #150</strong></p><p>7744 FM 1960 Road W<br>Houston, TX 77070</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7744+FM+1960+Road+W+Houston+TX+77070\' target=\'_blank\'>Get Directions</a></p>', 29.963552, -95.546031, 'ulta'],
  ['<p><strong>Ulta - GOODYEAR #157</strong></p><p>1450 N. Litchfield Rd<br>Goodyear, AZ 85395</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1450+N+Litchfield+Rd+Goodyear+AZ+85395\' target=\'_blank\'>Get Directions</a></p>', 33.4637219, -112.3611628, 'ulta'],
  ['<p><strong>Ulta - MIAMI #160</strong></p><p>12054 SW 88th Street<br>Miami, FL 33186</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=12054+SW+88th+Street+Miami+FL+33186\' target=\'_blank\'>Get Directions</a></p>', 25.684681, -80.3925253, 'ulta'],
  ['<p><strong>Ulta - FREDRICKSBURG #164</strong></p><p>1696 Carl D. Silver Parkway<br>Fredericksburg, VA 22404</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1696+Carl+D+Silver+Parkway+Fredericksburg+VA+22404\' target=\'_blank\'>Get Directions</a></p>', 38.3038878, -77.5111062, 'ulta'],
  ['<p><strong>Ulta - PEARLAND #165</strong></p><p>3133 Silver Lake Village Drive<br>Pearland, TX 77581</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3133+Silver+Lake+Village+Drive+Pearland+TX+77581\' target=\'_blank\'>Get Directions</a></p>', 29.5520492, -95.3852439, 'ulta'],
  ['<p><strong>Ulta - HUNTINGTON BEACH #166</strong></p><p>7777 Edinger Avenue<br>Huntington Beach, CA 92647</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7777+Edinger+Avenue+Huntington+Beach+CA+92647\' target=\'_blank\'>Get Directions</a></p>', 33.7315989, -117.9944272, 'ulta'],
  ['<p><strong>Ulta - MONROEVILLE #169</strong></p><p>701 Monroeville Mall<br>Monroeville, PA 15146</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=701+Monroeville+Mall+Monroeville+PA+15146\' target=\'_blank\'>Get Directions</a></p>', 40.4301408, -79.7944239, 'ulta'],
  ['<p><strong>Ulta - RICHMOND #171</strong></p><p>11500 Midlothian Turnpike<br>Richmond, VA 23235</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11500+Midlothian+Turnpike+Richmond+VA+23235\' target=\'_blank\'>Get Directions</a></p>', 37.5081833, -77.6092686, 'ulta'],
  ['<p><strong>Ulta - UPLAND # 174</strong></p><p>1927 North Campus Avenue<br>Upland, CA 91784</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1927+North+Campus+Avenue+Upland+CA+91784\' target=\'_blank\'>Get Directions</a></p>', 34.1334185, -117.6415591, 'ulta'],
  ['<p><strong>Ulta - FT. WORTH #179</strong></p><p>12864 South Freeway<br>Burleson, TX 76028</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=12864+South+Freeway+Burleson+TX+76028\' target=\'_blank\'>Get Directions</a></p>', 32.5703365, -97.3206781, 'ulta'],
  ['<p><strong>Ulta - LYNNWOOD #180</strong></p><p>19401 Alderwood Mall Pkwy<br>Lynnwood, WA 98036</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=19401+Alderwood+Mall+Pkwy+Lynnwood+WA+98036\' target=\'_blank\'>Get Directions</a></p>', 47.8220081, -122.2698617, 'ulta'],
  ['<p><strong>Ulta - DURHAM #181</strong></p><p>6923 Fayetteville Road<br>Durham, NC 27713</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6923+Fayetteville+Road+Durham+NC+27713\' target=\'_blank\'>Get Directions</a></p>', 35.9028866, -78.9368505, 'ulta'],
  ['<p><strong>Ulta - GILBERT #183</strong></p><p>2779 South Market Street<br>Gilbert, AZ 85295</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2779+South+Market+Street+Gilbert+AZ+85295\' target=\'_blank\'>Get Directions</a></p>', 33.2994164, -111.741747, 'ulta'],
  ['<p><strong>Ulta - TEMPE #185</strong></p><p>55 S. McClintock Drive<br>Tempe, AZ 85281</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=55+S+McClintock+Drive+Tempe+AZ+85281\' target=\'_blank\'>Get Directions</a></p>', 33.4310604, -111.9084666, 'ulta'],
  ['<p><strong>Ulta - ROCKAWAY #186</strong></p><p>395 Mt. Hope Road<br>Rockaway, NJ 07866</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=395+Mt+Hope+Road+Rockaway+NJ+07866\' target=\'_blank\'>Get Directions</a></p>', 40.916505, -74.53294, 'ulta'],
  ['<p><strong>Ulta - BEAVERTON #188</strong></p><p>3255 SW Cedar Hills Blvd.<br>Beaverton, OR 97005</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3255+SW+Cedar+Hills+Blvd+Beaverton+OR+97005\' target=\'_blank\'>Get Directions</a></p>', 45.4958701, -122.8108047, 'ulta'],
  ['<p><strong>Ulta - WILMINGTON #193</strong></p><p>840 Inspiration Drive<br>Wilmington, NC 28405</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=840+Inspiration+Drive+Wilmington+NC+28405\' target=\'_blank\'>Get Directions</a></p>', 34.2437536, -77.8302672, 'ulta'],
  ['<p><strong>Ulta - SAN MATEO #202</strong></p><p>3010 Bridgepointe Pkwy.<br>San Mateo, CA 94404</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3010+Bridgepointe+Pkwy+San+Mateo+CA+94404\' target=\'_blank\'>Get Directions</a></p>', 37.5613227, -122.2800065, 'ulta'],
  ['<p><strong>Ulta - Tustin # 208</strong></p><p>2863 Park Avenue<br>Tustin, CA 92780</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2863+Park+Avenue+Tustin+CA+92780\' target=\'_blank\'>Get Directions</a></p>', 33.6957224, -117.8265526, 'ulta'],
  ['<p><strong>Ulta - Corona # 212</strong></p><p>2541 Tuscany Street<br>Corona, CA 92881</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2541+Tuscany+Street+Corona+CA+92881\' target=\'_blank\'>Get Directions</a></p>', 33.8260083, -117.5177117, 'ulta'],
  ['<p><strong>Ulta - White Marsh #213</strong></p><p>8165-C Honeygo Boulevard<br>Baltimore, MD 21236</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8165-C+Honeygo+Boulevard+Baltimore+MD+21236\' target=\'_blank\'>Get Directions</a></p>', 39.3717659, -76.4624229, 'ulta'],
  ['<p><strong>Ulta - Middletown # 214</strong></p><p>444 Route 211 East<br>Middletown, NY 10940</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=444+Route+211+East+Middletown+NY+10940\' target=\'_blank\'>Get Directions</a></p>', 41.4534293, -74.3805865, 'ulta'],
  ['<p><strong>Ulta - San Antonio # 216</strong></p><p>17414 La Cantera Parkway<br>San Antonio, TX 78257</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=17414+La+Cantera+Parkway+San+Antonio+TX+78257\' target=\'_blank\'>Get Directions</a></p>', 29.6054252, -98.5990817, 'ulta'],
  ['<p><strong>Ulta - Miami #218</strong></p><p>3301 SW 22nd Street<br>Miami, FL 33145</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3301+SW+22nd+Street+Miami+FL+33145\' target=\'_blank\'>Get Directions</a></p>', 25.750417, -80.2496863, 'ulta'],
  ['<p><strong>Ulta - FAYETTEVILLE # 219</strong></p><p>5075 Morganton Rd Suite 9<br>Fayetteville, NC 28314</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5075+Morganton+Rd+Suite+9+Fayetteville+NC+28314\' target=\'_blank\'>Get Directions</a></p>', 35.067593, -78.9630496, 'ulta'],
  ['<p><strong>Ulta - Cumming # 220</strong></p><p>2295 Market Place Blvd.<br>Cumming, GA 30040</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2295+Market+Place+Blvd+Cumming+GA+30040\' target=\'_blank\'>Get Directions</a></p>', 34.1947629, -84.1287126, 'ulta'],
  ['<p><strong>Ulta - CEDAR RAPIDS # 221</strong></p><p>4651 1st  Avenue SE<br>Cedar Rapids, IA 52403</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4651+1st++Avenue+SE+Cedar+Rapids+IA+52403\' target=\'_blank\'>Get Directions</a></p>', 42.0236186, -91.6215922, 'ulta'],
  ['<p><strong>Ulta - Savannah # 222</strong></p><p>8108 Abercorn Street<br>Savannah, GA 31406</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8108+Abercorn+Street+Savannah+GA+31406\' target=\'_blank\'>Get Directions</a></p>', 32.0027282, -81.1224062, 'ulta'],
  ['<p><strong>Ulta - ATLANTA  GA (HOWELL MILL)</strong></p><p>1801 Howell Mill Road<br>Atlanta, GA 30318</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1801+Howell+Mill+Road+Atlanta+GA+30318\' target=\'_blank\'>Get Directions</a></p>', 33.8038415, -84.4134607, 'ulta'],
  ['<p><strong>Ulta - Columbia # 0235</strong></p><p>8241 Gateway Overlook Drive<br>Elkridge, MD 21075</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8241+Gateway+Overlook+Drive+Elkridge+MD+21075\' target=\'_blank\'>Get Directions</a></p>', 39.1851174, -76.7940551, 'ulta'],
  ['<p><strong>Ulta - Brighton # 238</strong></p><p>9830 Village Place Blvd.<br>Brighton, MI 48116</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9830+Village+Place+Blvd+Brighton+MI+48116\' target=\'_blank\'>Get Directions</a></p>', 42.5093769, -83.7559355, 'ulta'],
  ['<p><strong>Ulta - Mechanicsburg # 246</strong></p><p>6416 Carlisle Pike<br>Mechanicsburg, PA 17050</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6416+Carlisle+Pike+Mechanicsburg+PA+17050\' target=\'_blank\'>Get Directions</a></p>', 40.2477599, -77.0064007, 'ulta'],
  ['<p><strong>Ulta - Wellington # 247</strong></p><p>1020 S. State Road 7<br>Wellington, FL 33414</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1020+S+State+Road+7+Wellington+FL+33414\' target=\'_blank\'>Get Directions</a></p>', 26.6635678, -80.2009095, 'ulta'],
  ['<p><strong>Ulta - ORION TOWNSHIP # 257</strong></p><p>4830 South Baldwin<br>Orion Township, MI 48359</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4830+South+Baldwin+Orion+Township+MI+48359\' target=\'_blank\'>Get Directions</a></p>', 42.710275, -83.3102062, 'ulta'],
  ['<p><strong>Ulta - DAYTON #263</strong></p><p>2700 Miamisburg Centerville Ro<br>Dayton, OH 45459</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2700+Miamisburg+Centerville+Ro+Dayton+OH+45459\' target=\'_blank\'>Get Directions</a></p>', 39.6336819, -84.2209634, 'ulta'],
  ['<p><strong>Ulta - WALKER #267</strong></p><p>3165 Alpine Avenue<br>Walker, MI 49544</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3165+Alpine+Avenue+Walker+MI+49544\' target=\'_blank\'>Get Directions</a></p>', 43.0212812, -85.6917776, 'ulta'],
  ['<p><strong>Ulta - Modesto #268</strong></p><p>3900 Sisk Road<br>Modesto, CA 95356</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3900+Sisk+Road+Modesto+CA+95356\' target=\'_blank\'>Get Directions</a></p>', 37.6941758, -121.063882, 'ulta'],
  ['<p><strong>Ulta - Bolingbrook  IL (Promenade)</strong></p><p>641 E. Boughton Road<br>Bolingbrook, IL 60440</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=641+E+Boughton+Road+Bolingbrook+IL+60440\' target=\'_blank\'>Get Directions</a></p>', 41.7198629, -88.0418627, 'ulta'],
  ['<p><strong>Ulta - AUSTIN #271</strong></p><p>9500 S. IH 35 Service Road SB<br>Austin, TX 78748</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9500+S+IH+35+Service+Road+SB+Austin+TX+78748\' target=\'_blank\'>Get Directions</a></p>', 30.1652537, -97.7928559, 'ulta'],
  ['<p><strong>Ulta - PORT ST. LUCIE #272</strong></p><p>10740 SW Village Parkway<br>Port St. Lucie, FL 34987</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10740+SW+Village+Parkway+Port+St+Lucie+FL+34987\' target=\'_blank\'>Get Directions</a></p>', 27.2792253, -80.4364861, 'ulta'],
  ['<p><strong>Ulta - STRONGSVILLE #274</strong></p><p>16640 Royalton Road<br>Strongsville, OH 44136</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=16640+Royalton+Road+Strongsville+OH+44136\' target=\'_blank\'>Get Directions</a></p>', 41.3152837, -81.814964, 'ulta'],
  ['<p><strong>Ulta - FLOWER MOUND #275</strong></p><p>5801 Long Prairie Road<br>Flower Mound, TX 75028</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5801+Long+Prairie+Road+Flower+Mound+TX+75028\' target=\'_blank\'>Get Directions</a></p>', 33.0643537, -97.0823331, 'ulta'],
  ['<p><strong>Ulta - SAN JOSE #279</strong></p><p>31 Curtner Ave.<br>San Jose, CA 95125</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=31+Curtner+Ave+San+Jose+CA+95125\' target=\'_blank\'>Get Directions</a></p>', 37.3034726, -121.8638709, 'ulta'],
  ['<p><strong>Ulta - OKLAHOMA CITY #280</strong></p><p>6417 SW 3rd Street<br>Oklahoma City, OK 73127</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6417+SW+3rd+Street+Oklahoma+City+OK+73127\' target=\'_blank\'>Get Directions</a></p>', 35.461718, -97.6321254, 'ulta'],
  ['<p><strong>Ulta - SEATTLE #281</strong></p><p>401 NE Northgate Way<br>Seattle, WA 98125</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=401+NE+Northgate+Way+Seattle+WA+98125\' target=\'_blank\'>Get Directions</a></p>', 47.7069892, -122.3261358, 'ulta'],
  ['<p><strong>Ulta - PLYMOUTH #289</strong></p><p>188 Colony Place<br>Plymouth, MA 02360</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=188+Colony+Place+Plymouth+MA+02360\' target=\'_blank\'>Get Directions</a></p>', 41.95379, -70.712885, 'ulta'],
  ['<p><strong>Ulta - DOTHAN #290</strong></p><p>4401 Montgomery Hwy. Suite 500<br>Dothan, AL 36303</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4401+Montgomery+Hwy+Suite+500+Dothan+AL+36303\' target=\'_blank\'>Get Directions</a></p>', 31.2645426, -85.4438435, 'ulta'],
  ['<p><strong>Ulta - PAPILLION #292</strong></p><p>7701 Towne Center Parkway<br>Papillion, NE 68046</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7701+Towne+Center+Parkway+Papillion+NE+68046\' target=\'_blank\'>Get Directions</a></p>', 41.1330654, -96.0292258, 'ulta'],
  ['<p><strong>Ulta - HARKER HEIGHTS # 300</strong></p><p>201 E. Central Texas Expresswa<br>Harker Heights, TX 76548</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=201+E+Central+Texas+Expresswa+Harker+Heights+TX+76548\' target=\'_blank\'>Get Directions</a></p>', 31.0737433, -97.6649639, 'ulta'],
  ['<p><strong>Ulta - Lake Mead #301</strong></p><p>2186 N. Rainbow Blvd<br>Las Vegas, NV 89108</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2186+N+Rainbow+Blvd+Las+Vegas+NV+89108\' target=\'_blank\'>Get Directions</a></p>', 36.1991324, -115.2410644, 'ulta'],
  ['<p><strong>Ulta - El Paso #302</strong></p><p>1864 Joe Battle Blvd.<br>El Paso, TX 79936</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1864+Joe+Battle+Blvd+El+Paso+TX+79936\' target=\'_blank\'>Get Directions</a></p>', 31.7579857, -106.2649939, 'ulta'],
  ['<p><strong>Ulta - Fort Worth #0305</strong></p><p>9561 Sage Meadow Trail<br>Fort Worth, TX 76177</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9561+Sage+Meadow+Trail+Fort+Worth+TX+76177\' target=\'_blank\'>Get Directions</a></p>', 32.9118136, -97.3157534, 'ulta'],
  ['<p><strong>Ulta - Cedar Hill #0306</strong></p><p>305 West FM 1382<br>Cedar Hill, TX 75104</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=305+West+FM+1382+Cedar+Hill+TX+75104\' target=\'_blank\'>Get Directions</a></p>', 32.6023238, -96.9424976, 'ulta'],
  ['<p><strong>Ulta - San Antonio #307</strong></p><p>5347 W Loop 1604 N<br>San Antonio, TX 78253</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5347+W+Loop+1604+N+San+Antonio+TX+78253\' target=\'_blank\'>Get Directions</a></p>', 29.4929389, -98.7104389, 'ulta'],
  ['<p><strong>Ulta - Chattanooga #308</strong></p><p>2220 Hamilton Place Blvd<br>Chattanooga, TN 37421</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2220+Hamilton+Place+Blvd+Chattanooga+TN+37421\' target=\'_blank\'>Get Directions</a></p>', 35.0400111, -85.1538456, 'ulta'],
  ['<p><strong>Ulta - Tuscaloosa #0311</strong></p><p>1800 McFarland Blvd. E<br>Tuscaloosa, AL 35404</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1800+McFarland+Blvd+E+Tuscaloosa+AL+35404\' target=\'_blank\'>Get Directions</a></p>', 33.1947217, -87.5272106, 'ulta'],
  ['<p><strong>Ulta - MEMPHIS #316</strong></p><p>2273 N. Germantown Parkway<br>Cordova, TN 38016</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2273+N+Germantown+Parkway+Cordova+TN+38016\' target=\'_blank\'>Get Directions</a></p>', 35.1871084, -89.7952414, 'ulta'],
  ['<p><strong>Ulta - Midland #317</strong></p><p>4511 N. Midkiff Dr.<br>Midland, TX 79705</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4511+N+Midkiff+Dr+Midland+TX+79705\' target=\'_blank\'>Get Directions</a></p>', 32.0301564, -102.1316508, 'ulta'],
  ['<p><strong>Ulta - Amherst #332</strong></p><p>1701 Niagara Falls Blvd.<br>Amherst, NY 14228</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1701+Niagara+Falls+Blvd+Amherst+NY+14228\' target=\'_blank\'>Get Directions</a></p>', 43.0006912, -78.8203901, 'ulta'],
  ['<p><strong>Ulta - Mason #0341</strong></p><p>5145 Deerfield Blvd.<br>Mason, OH 45040</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5145+Deerfield+Blvd+Mason+OH+45040\' target=\'_blank\'>Get Directions</a></p>', 39.3052047, -84.3168124, 'ulta'],
  ['<p><strong>Ulta - Shreveport #0344</strong></p><p>7467 Youree Drive<br>Shreveport, LA 71105</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7467+Youree+Drive+Shreveport+LA+71105\' target=\'_blank\'>Get Directions</a></p>', 32.4386296, -93.7115823, 'ulta'],
  ['<p><strong>Ulta - Weatherford #347</strong></p><p>225 Adams<br>Weatherford, TX 76086</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=225+Adams+Weatherford+TX+76086\' target=\'_blank\'>Get Directions</a></p>', 32.7333967, -97.7881127, 'ulta'],
  ['<p><strong>Ulta - Portage #0348</strong></p><p>6142 South Westnedge Ave.<br>Portage, MI 49002</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6142+South+Westnedge+Ave+Portage+MI+49002\' target=\'_blank\'>Get Directions</a></p>', 42.2270272, -85.5916367, 'ulta'],
  ['<p><strong>Ulta - Macon #0350</strong></p><p>5080 Riverside Drive<br>Macon, GA 31210</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5080+Riverside+Drive+Macon+GA+31210\' target=\'_blank\'>Get Directions</a></p>', 32.9272301, -83.7147365, 'ulta'],
  ['<p><strong>Ulta - Toledo #352</strong></p><p>5001 Monroe St.<br>Toledo, OH 43623</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5001+Monroe+St+Toledo+OH+43623\' target=\'_blank\'>Get Directions</a></p>', 41.6940729, -83.6394451, 'ulta'],
  ['<p><strong>Ulta - San Diego #358</strong></p><p>3315 Rosecrans Street<br>San Diego, CA 92110</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3315+Rosecrans+Street+San+Diego+CA+92110\' target=\'_blank\'>Get Directions</a></p>', 32.7475376, -117.2066091, 'ulta'],
  ['<p><strong>Ulta - Collegeville #362</strong></p><p>40 Town Center Drive<br>Collegeville, PA 19426</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=40+Town+Center+Drive+Collegeville+PA+19426\' target=\'_blank\'>Get Directions</a></p>', 40.1649427, -75.4789354, 'ulta'],
  ['<p><strong>Ulta - Wichita Falls #365</strong></p><p>3201 Lawrence Road<br>Wichita Falls, TX 76308</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3201+Lawrence+Road+Wichita+Falls+TX+76308\' target=\'_blank\'>Get Directions</a></p>', 33.8754424, -98.5379007, 'ulta'],
  ['<p><strong>Ulta - Sterling #366</strong></p><p>22000 Dulles Retail Center<br>Sterling, VA 20166</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=22000+Dulles+Retail+Center+Sterling+VA+20166\' target=\'_blank\'>Get Directions</a></p>', 39.0063024, -77.4371188, 'ulta'],
  ['<p><strong>Ulta - Hammond #373</strong></p><p>2026 Hammond Square Dr.<br>Hammond, LA 70403</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2026+Hammond+Square+Dr+Hammond+LA+70403\' target=\'_blank\'>Get Directions</a></p>', 30.4805791, -90.4613116, 'ulta'],
  ['<p><strong>Ulta - Austin #374</strong></p><p>5207 Brodie Lane<br>Sunset Valley, TX 78745</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5207+Brodie+Lane+Sunset+Valley+TX+78745\' target=\'_blank\'>Get Directions</a></p>', 30.2306535, -97.8149562, 'ulta'],
  ['<p><strong>Ulta - Asheville #376</strong></p><p>3 South Tunnel Road<br>Asheville, NC 28805</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3+South+Tunnel+Road+Asheville+NC+28805\' target=\'_blank\'>Get Directions</a></p>', 35.5822695, -82.526029, 'ulta'],
  ['<p><strong>Ulta - Lexington #0383</strong></p><p>1956 Pavilion Way<br>Lexington, KY 40509</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1956+Pavilion+Way+Lexington+KY+40509\' target=\'_blank\'>Get Directions</a></p>', 38.0233337, -84.4152559, 'ulta'],
  ['<p><strong>Ulta - Ft. Lauderdale #385</strong></p><p>1746 North Federal Highway<br>Fort Lauderdale, FL 33305</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1746+North+Federal+Highway+Fort+Lauderdale+FL+33305\' target=\'_blank\'>Get Directions</a></p>', 26.1511659, -80.1181262, 'ulta'],
  ['<p><strong>Ulta - Folsom #389</strong></p><p>2381 Iron Point Road<br>Folsom, CA 95630</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2381+Iron+Point+Road+Folsom+CA+95630\' target=\'_blank\'>Get Directions</a></p>', 38.644273, -121.1232888, 'ulta'],
  ['<p><strong>Ulta - Tyler #391</strong></p><p>5510 S. Broadway<br>Tyler, TX 75703</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5510+S+Broadway+Tyler+TX+75703\' target=\'_blank\'>Get Directions</a></p>', 32.2888595, -95.3010331, 'ulta'],
  ['<p><strong>Ulta - Union Gap #0394</strong></p><p>1734 E. Washington<br>Union Gap, WA 98903</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1734+E+Washington+Union+Gap+WA+98903\' target=\'_blank\'>Get Directions</a></p>', 46.568761, -120.4787951, 'ulta'],
  ['<p><strong>Ulta - Dallas # 397</strong></p><p>8160 Park Lane<br>Dallas, TX 75231</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8160+Park+Lane+Dallas+TX+75231\' target=\'_blank\'>Get Directions</a></p>', 32.869477, -96.7680004, 'ulta'],
  ['<p><strong>Ulta - Short Pump #404</strong></p><p>11351 W. Broad Street<br>Glen Allen, VA 23060</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11351+W+Broad+Street+Glen+Allen+VA+23060\' target=\'_blank\'>Get Directions</a></p>', 37.6497675, -77.6073389, 'ulta'],
  ['<p><strong>Ulta - Corpus Christi #405</strong></p><p>5488 S. Padre Island Dr<br>Corpus Christi, TX 78411</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5488+S+Padre+Island+Dr+Corpus+Christi+TX+78411\' target=\'_blank\'>Get Directions</a></p>', 27.711028, -97.3724153, 'ulta'],
  ['<p><strong>Ulta - Tupelo #406</strong></p><p>1001 Barnes Crossing  Rd<br>Tupelo, MS 38804</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1001+Barnes+Crossing++Rd+Tupelo+MS+38804\' target=\'_blank\'>Get Directions</a></p>', 34.308443, -88.7016667, 'ulta'],
  ['<p><strong>Ulta - Fairview Heights #410</strong></p><p>6621 N. Illinois Street<br>Fairview Heights, IL 62208</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6621+N+Illinois+Street+Fairview+Heights+IL+62208\' target=\'_blank\'>Get Directions</a></p>', 38.5966785, -89.9873939, 'ulta'],
  ['<p><strong>Ulta - South Portland #411</strong></p><p>366 Maine Mall Road<br>South Portland, ME 04106</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=366+Maine+Mall+Road+South+Portland+ME+04106\' target=\'_blank\'>Get Directions</a></p>', 43.6317105, -70.3340392, 'ulta'],
  ['<p><strong>Ulta - Longview #415</strong></p><p>3096 N. Eastman Road<br>Longview, TX 75605</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3096+N+Eastman+Road+Longview+TX+75605\' target=\'_blank\'>Get Directions</a></p>', 32.5507273, -94.7247017, 'ulta'],
  ['<p><strong>Ulta - Fayetteville #417</strong></p><p>3835 N. Mall Avenue<br>Fayetteville, AR 72703</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3835+N+Mall+Avenue+Fayetteville+AR+72703\' target=\'_blank\'>Get Directions</a></p>', 36.1209107, -94.1507549, 'ulta'],
  ['<p><strong>Ulta - Duluth # 420</strong></p><p>1600 Miller Trunk Highway<br>Duluth, MN 55811</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1600+Miller+Trunk+Highway+Duluth+MN+55811\' target=\'_blank\'>Get Directions</a></p>', 46.8040006, -92.1603038, 'ulta'],
  ['<p><strong>Ulta - Avon # 421</strong></p><p>380 West Main St<br>Avon, CT 06001</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=380+West+Main+St+Avon+CT+06001\' target=\'_blank\'>Get Directions</a></p>', 41.8160397, -72.8622913, 'ulta'],
  ['<p><strong>Ulta - Columbus (Polaris) #424</strong></p><p>1285 Polaris Pkwy<br>Columbus, OH 43240</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1285+Polaris+Pkwy+Columbus+OH+43240\' target=\'_blank\'>Get Directions</a></p>', 40.1399112, -82.9858552, 'ulta'],
  ['<p><strong>Ulta - Summerville #425</strong></p><p>434 Azalea Square Blvd.<br>Summerville, SC 29483</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=434+Azalea+Square+Blvd+Summerville+SC+29483\' target=\'_blank\'>Get Directions</a></p>', 33.040492, -80.1582524, 'ulta'],
  ['<p><strong>Ulta - Chandler (Casa Paloma) #434</strong></p><p>7131 W. Ray Road<br>Chandler, AZ 85226</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7131+W+Ray+Road+Chandler+AZ+85226\' target=\'_blank\'>Get Directions</a></p>', 33.3181459, -111.9657564, 'ulta'],
  ['<p><strong>Ulta - Albuquerque  # 436</strong></p><p>10000 Coors Blvd. NW<br>Albuquerque, NM 87114</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10000+Coors+Blvd+NW+Albuquerque+NM+87114\' target=\'_blank\'>Get Directions</a></p>', 35.1929, -106.6564585, 'ulta'],
  ['<p><strong>Ulta - Brandon # 437</strong></p><p>2442 W. Brandon Blvd<br>Brandon, FL 33511</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2442+W+Brandon+Blvd+Brandon+FL+33511\' target=\'_blank\'>Get Directions</a></p>', 27.9418281, -82.3216569, 'ulta'],
  ['<p><strong>Ulta - MANKATO # 445</strong></p><p>1850 Adams Street<br>Mankato, MN 56001</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1850+Adams+Street+Mankato+MN+56001\' target=\'_blank\'>Get Directions</a></p>', 44.1728541, -93.9537317, 'ulta'],
  ['<p><strong>Ulta - Aventura # 448</strong></p><p>21065 Biscayne Blvd<br>Aventura, FL 33180</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=21065+Biscayne+Blvd+Aventura+FL+33180\' target=\'_blank\'>Get Directions</a></p>', 25.9704547, -80.1415063, 'ulta'],
  ['<p><strong>Ulta - MANCHESTER # 450</strong></p><p>1500 South Willow Street<br>Manchester, NH 03103</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1500+South+Willow+Street+Manchester+NH+03103\' target=\'_blank\'>Get Directions</a></p>', 42.9554768, -71.4325338, 'ulta'],
  ['<p><strong>Ulta - Glendora # 452</strong></p><p>1229 S. Lone Hill Avenue<br>Glendora, CA 91740</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1229+S+Lone+Hill+Avenue+Glendora+CA+91740\' target=\'_blank\'>Get Directions</a></p>', 34.116484, -117.833295, 'ulta'],
  ['<p><strong>Ulta - Houma  #454</strong></p><p>1779 Martin Luther King Blvd<br>Houma, LA 70360</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1779+Martin+Luther+King+Blvd+Houma+LA+70360\' target=\'_blank\'>Get Directions</a></p>', 29.6156281, -90.7595238, 'ulta'],
  ['<p><strong>Ulta - Farmington #455</strong></p><p>320 North Station Parkway<br>Farmington, UT 84025</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=320+North+Station+Parkway+Farmington+UT+84025\' target=\'_blank\'>Get Directions</a></p>', 40.9860108, -111.9035425, 'ulta'],
  ['<p><strong>Ulta - Gastonia #456</strong></p><p>415 Cox Road<br>Gastonia, NC 28054</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=415+Cox+Road+Gastonia+NC+28054\' target=\'_blank\'>Get Directions</a></p>', 35.2623171, -81.1356373, 'ulta'],
  ['<p><strong>Ulta - REDONDO BEACH # 457</strong></p><p>1513 Hawthorne Blvd<br>Redondo Beach, CA 90278</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1513+Hawthorne+Blvd+Redondo+Beach+CA+90278\' target=\'_blank\'>Get Directions</a></p>', 33.8683809, -118.3539536, 'ulta'],
  ['<p><strong>Ulta - PEABODY # 458</strong></p><p>210 Andover St<br>Peabody, MA 01960</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=210+Andover+St+Peabody+MA+01960\' target=\'_blank\'>Get Directions</a></p>', 42.540465, -70.9427116, 'ulta'],
  ['<p><strong>Ulta - GARNER # 461</strong></p><p>165 Shenstone Blvd.<br>Garner, NC 27529</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=165+Shenstone+Blvd+Garner+NC+27529\' target=\'_blank\'>Get Directions</a></p>', 35.6943073, -78.5802351, 'ulta'],
  ['<p><strong>Ulta - Denham Springs # 463</strong></p><p>10129 Crossing Way<br>Denham Springs, LA 70726</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10129+Crossing+Way+Denham+Springs+LA+70726\' target=\'_blank\'>Get Directions</a></p>', 30.4665525, -90.920723, 'ulta'],
  ['<p><strong>Ulta - CHAMPAIGN # 466</strong></p><p>2023 N. Prospect Ave<br>Champaign, IL 61822</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2023+N+Prospect+Ave+Champaign+IL+61822\' target=\'_blank\'>Get Directions</a></p>', 40.1403693, -88.2600725, 'ulta'],
  ['<p><strong>Ulta - Bakersfield #469</strong></p><p>9000 Ming Avenue<br>Bakersfield, CA 93311</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9000+Ming+Avenue+Bakersfield+CA+93311\' target=\'_blank\'>Get Directions</a></p>', 35.3414311, -119.1034731, 'ulta'],
  ['<p><strong>Ulta - MEMPHIS # 470</strong></p><p>7680 Polo Grounds Blvd<br>Memphis, TN 38125</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7680+Polo+Grounds+Blvd+Memphis+TN+38125\' target=\'_blank\'>Get Directions</a></p>', 35.0523685, -89.8074323, 'ulta'],
  ['<p><strong>Ulta - Valencia #474</strong></p><p>24235 Magic Mountain Pkwy<br>Valencia, CA 91355</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=24235+Magic+Mountain+Pkwy+Valencia+CA+91355\' target=\'_blank\'>Get Directions</a></p>', 34.4196029, -118.5591036, 'ulta'],
  ['<p><strong>Ulta - WOODHAVEN # 475</strong></p><p>19255 West Road<br>Woodhaven, MI 48183</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=19255+West+Road+Woodhaven+MI+48183\' target=\'_blank\'>Get Directions</a></p>', 42.1375673, -83.2238733, 'ulta'],
  ['<p><strong>Ulta - MADISON # 477</strong></p><p>175 Grandview Blvd<br>Madison, MS 39110</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=175+Grandview+Blvd+Madison+MS+39110\' target=\'_blank\'>Get Directions</a></p>', 32.4643294, -90.1355778, 'ulta'],
  ['<p><strong>Ulta - MOBILE # 478</strong></p><p>3250 Airport Blvd.<br>Mobile, AL 36606</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3250+Airport+Blvd+Mobile+AL+36606\' target=\'_blank\'>Get Directions</a></p>', 30.6793121, -88.1245373, 'ulta'],
  ['<p><strong>Ulta - BOARDMAN # 479</strong></p><p>403 Boardman Poland Road<br>Boardman, OH 44512</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=403+Boardman+Poland+Road+Boardman+OH+44512\' target=\'_blank\'>Get Directions</a></p>', 41.0243161, -80.6501325, 'ulta'],
  ['<p><strong>Ulta - MAYFIELD HEIGHTS # 480</strong></p><p>1405 SOM Center Rd<br>Mayfield Heights, OH 44124</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1405+SOM+Center+Rd+Mayfield+Heights+OH+44124\' target=\'_blank\'>Get Directions</a></p>', 41.5220807, -81.4370833, 'ulta'],
  ['<p><strong>Ulta - REGO PARK # 483</strong></p><p>61-35 Junction Blvd<br>Rego Park, NY 11374</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=61-35+Junction+Blvd+Rego+Park+NY+11374\' target=\'_blank\'>Get Directions</a></p>', 40.7332336, -73.8638164, 'ulta'],
  ['<p><strong>Ulta - Pittsburgh #484</strong></p><p>1310 Settler Ridge Center Dr<br>Pittsburgh, PA 15205</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1310+Settler+Ridge+Center+Dr+Pittsburgh+PA+15205\' target=\'_blank\'>Get Directions</a></p>', 40.4403168, -80.1472506, 'ulta'],
  ['<p><strong>Ulta - FLORENCE # 486</strong></p><p>7673 Mall Rd.<br>Florence, KY 41042</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7673+Mall+Rd+Florence+KY+41042\' target=\'_blank\'>Get Directions</a></p>', 38.9978116, -84.6558818, 'ulta'],
  ['<p><strong>Ulta - MARIETTA # 487</strong></p><p>1311 Johnson Ferry Rd.<br>Marietta, GA 30068</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1311+Johnson+Ferry+Rd+Marietta+GA+30068\' target=\'_blank\'>Get Directions</a></p>', 33.9804521, -84.4280164, 'ulta'],
  ['<p><strong>Ulta - FREDERICK # 489</strong></p><p>7310 Guilford Drive<br>Frederick, MD 21704</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7310+Guilford+Drive+Frederick+MD+21704\' target=\'_blank\'>Get Directions</a></p>', 39.3972033, -77.4154199, 'ulta'],
  ['<p><strong>Ulta - GARLAND # 491</strong></p><p>180 Cedar Sage Dr.<br>Garland, TX 75040</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=180+Cedar+Sage+Dr+Garland+TX+75040\' target=\'_blank\'>Get Directions</a></p>', 32.95364, -96.6134578, 'ulta'],
  ['<p><strong>Ulta - SAN JOSE # 492</strong></p><p>600 El Paseo de Saratoga<br>San Jose, CA 95130</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=600+El+Paseo+de+Saratoga+San+Jose+CA+95130\' target=\'_blank\'>Get Directions</a></p>', 37.2886837, -121.9910048, 'ulta'],
  ['<p><strong>Ulta - Odessa #494</strong></p><p>6317 East Hwy 191<br>Odessa, TX 79762</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6317+East+Hwy+191+Odessa+TX+79762\' target=\'_blank\'>Get Directions</a></p>', 31.8989318, -102.312826, 'ulta'],
  ['<p><strong>Ulta - Medford # 497</strong></p><p>25 Rossanley Drive<br>Medford, OR 97501</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=25+Rossanley+Drive+Medford+OR+97501\' target=\'_blank\'>Get Directions</a></p>', 42.3441779, -122.8812715, 'ulta'],
  ['<p><strong>Ulta - Beavercreek #498</strong></p><p>2720 Towne Dr.<br>Beavercreek, OH 45431</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2720+Towne+Dr+Beavercreek+OH+45431\' target=\'_blank\'>Get Directions</a></p>', 39.7675626, -84.0495359, 'ulta'],
  ['<p><strong>Ulta - Rancho Santa Margarita #499</strong></p><p>30682 Santa Margarita Parkway<br>Rancho Santa Margarita, CA 92688</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=30682+Santa+Margarita+Parkway+Rancho+Santa+Margarita+CA+92688\' target=\'_blank\'>Get Directions</a></p>', 33.6428319, -117.5961276, 'ulta'],
  ['<p><strong>Ulta - San Angelo #500</strong></p><p>4001 Sunset Drive<br>San Angelo, TX 76904</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4001+Sunset+Drive+San+Angelo+TX+76904\' target=\'_blank\'>Get Directions</a></p>', 31.4277851, -100.4979218, 'ulta'],
  ['<p><strong>Ulta - Redmond #502</strong></p><p>17170 NE Redmond Way<br>Redmond, WA 98052</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=17170+NE+Redmond+Way+Redmond+WA+98052\' target=\'_blank\'>Get Directions</a></p>', 47.671891, -122.1117449, 'ulta'],
  ['<p><strong>Ulta - Columbia #503</strong></p><p>221 N. Stadium Blvd<br>Columbia, MO 65203</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=221+N+Stadium+Blvd+Columbia+MO+65203\' target=\'_blank\'>Get Directions</a></p>', 38.9602573, -92.3749605, 'ulta'],
  ['<p><strong>Ulta - Peoria #504</strong></p><p>2601 West Lake Street<br>Peoria, IL 61615</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2601+West+Lake+Street+Peoria+IL+61615\' target=\'_blank\'>Get Directions</a></p>', 40.7399366, -89.6338192, 'ulta'],
  ['<p><strong>Ulta - Monroe # 509</strong></p><p>4429 Pecanland Mall Drive<br>Monroe, LA 71203</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4429+Pecanland+Mall+Drive+Monroe+LA+71203\' target=\'_blank\'>Get Directions</a></p>', 32.4990628, -92.0673623, 'ulta'],
  ['<p><strong>Ulta - Ramsey # 510</strong></p><p>1255 Route 17 South<br>Ramsey, NJ 07446</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1255+Route+17+South+Ramsey+NJ+07446\' target=\'_blank\'>Get Directions</a></p>', 41.0705248, -74.1394566, 'ulta'],
  ['<p><strong>Ulta - Kennewick  # 512</strong></p><p>1321 N. Columbia Center Blvd.<br>Kennewick, WA 99336</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1321+N+Columbia+Center+Blvd+Kennewick+WA+99336\' target=\'_blank\'>Get Directions</a></p>', 46.2260857, -119.2274195, 'ulta'],
  ['<p><strong>Ulta - Logan # 517</strong></p><p>1050 N. Main St.<br>Logan, UT 84341</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1050+N+Main+St+Logan+UT+84341\' target=\'_blank\'>Get Directions</a></p>', 41.7509519, -111.8324516, 'ulta'],
  ['<p><strong>Ulta - Saginaw #522</strong></p><p>3279 Tittabawasse Road<br>Saginaw, MI 48604</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3279+Tittabawasse+Road+Saginaw+MI+48604\' target=\'_blank\'>Get Directions</a></p>', 43.4775308, -83.9811572, 'ulta'],
  ['<p><strong>Ulta - Braintree # 526</strong></p><p>380 Grossman Dr<br>Braintree, MA 02184</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=380+Grossman+Dr+Braintree+MA+02184\' target=\'_blank\'>Get Directions</a></p>', 42.2143664, -70.9989342, 'ulta'],
  ['<p><strong>Ulta - Waldorf # 527</strong></p><p>2945 Festival Way<br>Waldorf, MD 20601</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2945+Festival+Way+Waldorf+MD+20601\' target=\'_blank\'>Get Directions</a></p>', 38.6312323, -76.909135, 'ulta'],
  ['<p><strong>Ulta - Peachtree Corners # 528</strong></p><p>5145 Peachtree Pkwy # 440<br>Peachtree Corners, GA 30092</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5145+Peachtree+Pkwy+#+440+Peachtree+Corners+GA+30092\' target=\'_blank\'>Get Directions</a></p>', 33.9815796, -84.2164277, 'ulta'],
  ['<p><strong>Ulta - Harahan # 529</strong></p><p>1126 S. Clearview Pkwy<br>Harahan, LA 70123</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1126+S+Clearview+Pkwy+Harahan+LA+70123\' target=\'_blank\'>Get Directions</a></p>', 29.9610953, -90.1856466, 'ulta'],
  ['<p><strong>Ulta - Council Bluffs # 532</strong></p><p>3502 Metro Drive<br>Council Bluffs, IA 51501</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3502+Metro+Drive+Council+Bluffs+IA+51501\' target=\'_blank\'>Get Directions</a></p>', 41.224435, -95.840646, 'ulta'],
  ['<p><strong>Ulta - Lincoln  #535</strong></p><p>3120 Pine Lake Rd.<br>Lincoln, NE 68516</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3120+Pine+Lake+Rd+Lincoln+NE+68516\' target=\'_blank\'>Get Directions</a></p>', 40.7423226, -96.6745877, 'ulta'],
  ['<p><strong>Ulta - Pasadena  #536</strong></p><p>5696 Fairmont Parkway<br>Pasadena, TX 77505</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5696+Fairmont+Parkway+Pasadena+TX+77505\' target=\'_blank\'>Get Directions</a></p>', 29.64656, -95.1539178, 'ulta'],
  ['<p><strong>Ulta - Sanford  #537</strong></p><p>1751 WP Ball Blvd<br>Sanford, FL 32771</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1751+WP+Ball+Blvd+Sanford+FL+32771\' target=\'_blank\'>Get Directions</a></p>', 28.7987653, -81.3348013, 'ulta'],
  ['<p><strong>Ulta - Westminster # 540</strong></p><p>14521 Orchard Parkway<br>Westminster, CO 80023</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=14521+Orchard+Parkway+Westminster+CO+80023\' target=\'_blank\'>Get Directions</a></p>', 39.9602696, -104.9955682, 'ulta'],
  ['<p><strong>Ulta - Flint # 541</strong></p><p>4067 Miller Road<br>Flint, MI 48507</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4067+Miller+Road+Flint+MI+48507\' target=\'_blank\'>Get Directions</a></p>', 42.9810867, -83.7534861, 'ulta'],
  ['<p><strong>Ulta - Garden City # 544</strong></p><p>990 Old Country Road<br>Garden City, NY 11530</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=990+Old+Country+Road+Garden+City+NY+11530\' target=\'_blank\'>Get Directions</a></p>', 40.742841, -73.6049122, 'ulta'],
  ['<p><strong>Ulta - Vacaville # 545</strong></p><p>1641-C East Monte Vista Avenue<br>Vacaville, CA 95688</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1641-C+East+Monte+Vista+Avenue+Vacaville+CA+95688\' target=\'_blank\'>Get Directions</a></p>', 38.3694524, -121.9626481, 'ulta'],
  ['<p><strong>Ulta - El Paso # 546</strong></p><p>8889 Gateway Blvd. West<br>El Paso, TX 79925</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8889+Gateway+Blvd+West+El+Paso+TX+79925\' target=\'_blank\'>Get Directions</a></p>', 31.7707749, -106.3711151, 'ulta'],
  ['<p><strong>Ulta - Goleta # 547</strong></p><p>7000 Marketplace Drive<br>Goleta, CA 93117</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7000+Marketplace+Drive+Goleta+CA+93117\' target=\'_blank\'>Get Directions</a></p>', 34.4296116, -119.8721201, 'ulta'],
  ['<p><strong>Ulta - Glen Allen  VA</strong></p><p>9930 Brook Road<br>Glen Allen, VA 23059</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9930+Brook+Road+Glen+Allen+VA+23059\' target=\'_blank\'>Get Directions</a></p>', 37.670127, -77.4643262, 'ulta'],
  ['<p><strong>Ulta - Florence # 550</strong></p><p>1945 W. Palmetto St.<br>Florence, SC 29501</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1945+W+Palmetto+St+Florence+SC+29501\' target=\'_blank\'>Get Directions</a></p>', 34.1881954, -79.8106652, 'ulta'],
  ['<p><strong>Ulta - Morgantown # 0551</strong></p><p>1010 Giant Street<br>Morgantown, WV 26501</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1010+Giant+Street+Morgantown+WV+26501\' target=\'_blank\'>Get Directions</a></p>', 39.6478191, -80.0034891, 'ulta'],
  ['<p><strong>Ulta - Puyallup # 554</strong></p><p>16908 Meridian East<br>Puyallup, WA 98375</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=16908+Meridian+East+Puyallup+WA+98375\' target=\'_blank\'>Get Directions</a></p>', 47.1027466, -122.29422, 'ulta'],
  ['<p><strong>Ulta - Springfield  PA</strong></p><p>1250 Baltimore Pike<br>Springfield, PA 19064</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1250+Baltimore+Pike+Springfield+PA+19064\' target=\'_blank\'>Get Directions</a></p>', 39.9150646, -75.3520101, 'ulta'],
  ['<p><strong>Ulta - Decatur # 560</strong></p><p>2401 6th Ave. SE<br>Decatur, AL 35602</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2401+6th+Ave+SE+Decatur+AL+35602\' target=\'_blank\'>Get Directions</a></p>', 34.5644406, -86.9742853, 'ulta'],
  ['<p><strong>Ulta - Northville # 563</strong></p><p>17615 Haggerty Rd<br>Northville, MI 48167</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=17615+Haggerty+Rd+Northville+MI+48167\' target=\'_blank\'>Get Directions</a></p>', 42.414214, -83.4354078, 'ulta'],
  ['<p><strong>Ulta - Richmond # 567</strong></p><p>5458 West Grand Parkway South<br>Richmond, TX 77406</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5458+West+Grand+Parkway+South+Richmond+TX+77406\' target=\'_blank\'>Get Directions</a></p>', 29.6945783, -95.7766076, 'ulta'],
  ['<p><strong>Ulta - Gainesville # 570</strong></p><p>6843 West Newberry Road<br>Gainesville, FL 32605</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6843+West+Newberry+Road+Gainesville+FL+32605\' target=\'_blank\'>Get Directions</a></p>', 29.6582697, -82.4156405, 'ulta'],
  ['<p><strong>Ulta - Rosenberg # 571</strong></p><p>23735 Brazos Town Crossing<br>Rosenburg, TX 77471</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=23735+Brazos+Town+Crossing+Rosenburg+TX+77471\' target=\'_blank\'>Get Directions</a></p>', 29.5436894, -95.7462025, 'ulta'],
  ['<p><strong>Ulta - Boise # 574</strong></p><p>542 N. Milwaukee<br>Boise, ID 83704</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=542+N+Milwaukee+Boise+ID+83704\' target=\'_blank\'>Get Directions</a></p>', 43.6097915, -116.2834586, 'ulta'],
  ['<p><strong>Ulta - Turlock # 575</strong></p><p>2841 Countryside Drive<br>Turlock, CA 95380</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2841+Countryside+Drive+Turlock+CA+95380\' target=\'_blank\'>Get Directions</a></p>', 37.5187337, -120.882684, 'ulta'],
  ['<p><strong>Ulta - Coral Springs # 576</strong></p><p>4601 N. University Drive<br>Coral Springs, FL 33067</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4601+N+University+Drive+Coral+Springs+FL+33067\' target=\'_blank\'>Get Directions</a></p>', 26.2874752, -80.2477759, 'ulta'],
  ['<p><strong>Ulta - Boca Raton # 578</strong></p><p>9882 Glades Road<br>Boca Raton, FL 33434</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9882+Glades+Road+Boca+Raton+FL+33434\' target=\'_blank\'>Get Directions</a></p>', 26.3646899, -80.2012857, 'ulta'],
  ['<p><strong>Ulta - Grand Rapids # 580</strong></p><p>3541 28th Street SE<br>Grand Rapids, MI 49512</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3541+28th+Street+SE+Grand+Rapids+MI+49512\' target=\'_blank\'>Get Directions</a></p>', 42.9148757, -85.5796708, 'ulta'],
  ['<p><strong>Ulta - Davie # 581</strong></p><p>1950 S. University Drive<br>Davie, FL 33324</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1950+S+University+Drive+Davie+FL+33324\' target=\'_blank\'>Get Directions</a></p>', 26.0953704, -80.2482062, 'ulta'],
  ['<p><strong>Ulta - Fenton # 582</strong></p><p>189 Gravois Bluffs Plaza Drive<br>Fenton, MO 63026</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=189+Gravois+Bluffs+Plaza+Drive+Fenton+MO+63026\' target=\'_blank\'>Get Directions</a></p>', 38.5033166, -90.4473256, 'ulta'],
  ['<p><strong>Ulta - El Cajon # 583</strong></p><p>315 Parkway Plaza<br>El Cajon, CA 92020</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=315+Parkway+Plaza+El+Cajon+CA+92020\' target=\'_blank\'>Get Directions</a></p>', 32.8045604, -116.966579, 'ulta'],
  ['<p><strong>Ulta - Plano # 586</strong></p><p>2400 Preston Road<br>Plano, TX 75093</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2400+Preston+Road+Plano+TX+75093\' target=\'_blank\'>Get Directions</a></p>', 33.029232, -96.7928213, 'ulta'],
  ['<p><strong>Ulta - Coeur d\'Alene</strong></p><p>450 W. Wilbur Ave.<br>Coeur D\'Alene, ID 83814</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=450+W+Wilbur+Ave+Coeur+D\'Alene+ID+83814\' target=\'_blank\'>Get Directions</a></p>', 47.7350501, -116.7942118, 'ulta'],
  ['<p><strong>Ulta - Pensacola # 596</strong></p><p>1650 Airport Blvd.<br>Pensacola, FL 32504</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1650+Airport+Blvd+Pensacola+FL+32504\' target=\'_blank\'>Get Directions</a></p>', 30.4818668, -87.2079357, 'ulta'],
  ['<p><strong>Ulta - Springfield # 600</strong></p><p>3434 S. Glenstone Avenue<br>Springfield, MO 65804</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3434+S+Glenstone+Avenue+Springfield+MO+65804\' target=\'_blank\'>Get Directions</a></p>', 37.1511794, -93.2611799, 'ulta'],
  ['<p><strong>Ulta - Roanoke # 608</strong></p><p>4802 Valley View Blvd.<br>Roanoke, VA 24012</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4802+Valley+View+Blvd+Roanoke+VA+24012\' target=\'_blank\'>Get Directions</a></p>', 37.3046275, -79.9632462, 'ulta'],
  ['<p><strong>Ulta - Portland # 612</strong></p><p>1241 Lloyd Center<br>Portland, OR 97232</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1241+Lloyd+Center+Portland+OR+97232\' target=\'_blank\'>Get Directions</a></p>', 45.5316594, -122.6545964, 'ulta'],
  ['<p><strong>Ulta - San Ysidro # 614</strong></p><p>3951 Camino de la Plaza<br>San Ysidro, CA 92173</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3951+Camino+de+la+Plaza+San+Ysidro+CA+92173\' target=\'_blank\'>Get Directions</a></p>', 32.5433917, -117.0462159, 'ulta'],
  ['<p><strong>Ulta - Dobbs Ferry # 0616</strong></p><p>16 Lawrence Street<br>Dobbs Ferry, NY 10522</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=16+Lawrence+Street+Dobbs+Ferry+NY+10522\' target=\'_blank\'>Get Directions</a></p>', 41.0022512, -73.8577572, 'ulta'],
  ['<p><strong>Ulta - Staten Island # 0617</strong></p><p>245 Bricktown Way<br>Staten Island, NY 10309</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=245+Bricktown+Way+Staten+Island+NY+10309\' target=\'_blank\'>Get Directions</a></p>', 40.5300883, -74.2324224, 'ulta'],
  ['<p><strong>Ulta - Houston # 618</strong></p><p>3025 Kirby Drive<br>Houston, TX 77098</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3025+Kirby+Drive+Houston+TX+77098\' target=\'_blank\'>Get Directions</a></p>', 29.7378557, -95.41801, 'ulta'],
  ['<p><strong>Ulta - Orem # 622</strong></p><p>303 East University Parkway<br>Orem, UT 84058</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=303+East+University+Parkway+Orem+UT+84058\' target=\'_blank\'>Get Directions</a></p>', 40.2746136, -111.6895949, 'ulta'],
  ['<p><strong>Ulta - Clifton # 623</strong></p><p>225 Allwood Road<br>Clifton, NJ 07012</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=225+Allwood+Road+Clifton+NJ+07012\' target=\'_blank\'>Get Directions</a></p>', 40.8362135, -74.1507816, 'ulta'],
  ['<p><strong>Ulta - Everett # 625</strong></p><p>1402 S.E. Everett Mall Way<br>Everett, WA 98208</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1402+SE+Everett+Mall+Way+Everett+WA+98208\' target=\'_blank\'>Get Directions</a></p>', 47.9096609, -122.2130897, 'ulta'],
  ['<p><strong>Ulta - Madison # 627</strong></p><p>2185 Zeier Road<br>Madison, WI 53704</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2185+Zeier+Road+Madison+WI+53704\' target=\'_blank\'>Get Directions</a></p>', 43.1285665, -89.3016011, 'ulta'],
  ['<p><strong>Ulta - Woodbridge # 0629</strong></p><p>15000 Potomac Town Place<br>Woodbridge, VA 22191</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15000+Potomac+Town+Place+Woodbridge+VA+22191\' target=\'_blank\'>Get Directions</a></p>', 38.6290163, -77.2881936, 'ulta'],
  ['<p><strong>Ulta - Knoxville # 0631</strong></p><p>11233 Parkside Drive<br>Knoxville, TN 37934</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11233+Parkside+Drive+Knoxville+TN+37934\' target=\'_blank\'>Get Directions</a></p>', 35.9009845, -84.1566127, 'ulta'],
  ['<p><strong>Ulta - Athens # 640</strong></p><p>1791 Oconee Connector<br>Athens, GA 30606</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1791+Oconee+Connector+Athens+GA+30606\' target=\'_blank\'>Get Directions</a></p>', 33.9164119, -83.4553356, 'ulta'],
  ['<p><strong>Ulta - Carmel # 642</strong></p><p>2009 East Greyhound Pass<br>Carmel, IN 46032</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2009+East+Greyhound+Pass+Carmel+IN+46032\' target=\'_blank\'>Get Directions</a></p>', 40.0007629, -86.1249829, 'ulta'],
  ['<p><strong>Ulta - Columbia # 644</strong></p><p>702 Cross Hill Road<br>Columbia, SC 29205</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=702+Cross+Hill+Road+Columbia+SC+29205\' target=\'_blank\'>Get Directions</a></p>', 33.992654, -80.9753597, 'ulta'],
  ['<p><strong>Ulta - Houston # 651</strong></p><p>7036 Highway 6 N<br>Houston, TX 77095</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7036+Highway+6+N+Houston+TX+77095\' target=\'_blank\'>Get Directions</a></p>', 29.8814439, -95.6435622, 'ulta'],
  ['<p><strong>Ulta - Freehold # 659</strong></p><p>3710 Route 9<br>Freehold, NJ 07728</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3710+Route+9+Freehold+NJ+07728\' target=\'_blank\'>Get Directions</a></p>', 40.2512737, -74.3002711, 'ulta'],
  ['<p><strong>Ulta - Eastvale # 663</strong></p><p>12423 Limonite Avenue<br>Eastvale, CA 91752</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=12423+Limonite+Avenue+Eastvale+CA+91752\' target=\'_blank\'>Get Directions</a></p>', 33.976518, -117.553241, 'ulta'],
  ['<p><strong>Ulta - Conway # 0665</strong></p><p>1278 South Amity Road<br>Conway, AR 72032</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1278+South+Amity+Road+Conway+AR+72032\' target=\'_blank\'>Get Directions</a></p>', 35.062655, -92.4129204, 'ulta'],
  ['<p><strong>Ulta - Helena #667</strong></p><p>2005 Cromwell Dixon Lane<br>Helena, MT 59602</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2005+Cromwell+Dixon+Lane+Helena+MT+59602\' target=\'_blank\'>Get Directions</a></p>', 46.6138312, -112.009195, 'ulta'],
  ['<p><strong>Ulta - Southaven # 670</strong></p><p>6554 Towne Center Crossing<br>Southaven, MS 38671</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6554+Towne+Center+Crossing+Southaven+MS+38671\' target=\'_blank\'>Get Directions</a></p>', 34.9563037, -89.9918758, 'ulta'],
  ['<p><strong>Ulta - Tallahassee #0679</strong></p><p>1554 Govenor\'s Square Boulevard<br>Tallahassee, FL 32301</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1554+Govenor\'s+Square+Boulevard+Tallahassee+FL+32301\' target=\'_blank\'>Get Directions</a></p>', 30.4409025, -84.2570764, 'ulta'],
  ['<p><strong>Ulta - Morehead City # 684</strong></p><p>5160 US Hwy 70 West<br>Morehead City, NC 28557</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5160+US+Hwy+70+West+Morehead+City+NC+28557\' target=\'_blank\'>Get Directions</a></p>', 34.7404813, -76.8055973, 'ulta'],
  ['<p><strong>Ulta - San Rafael # 687</strong></p><p>580 Francisco Blvd. West<br>San Rafael, CA 94901</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=580+Francisco+Blvd+West+San+Rafael+CA+94901\' target=\'_blank\'>Get Directions</a></p>', 37.9637989, -122.5152186, 'ulta'],
  ['<p><strong>Ulta - Baltimore (Canton Crossing) #696</strong></p><p>3541 Boston Street<br>Baltimore, MD 21224</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3541+Boston+Street+Baltimore+MD+21224\' target=\'_blank\'>Get Directions</a></p>', 39.2759603, -76.5670201, 'ulta'],
  ['<p><strong>Ulta - Moreno Valley # 697</strong></p><p>12625 Frederick Ave. Suite G-1<br>Moreno Valley, CA 92553</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=12625+Frederick+Ave+Suite+G-1+Moreno+Valley+CA+92553\' target=\'_blank\'>Get Directions</a></p>', 33.9362763, -117.2651643, 'ulta'],
  ['<p><strong>Ulta - New Orleans #699</strong></p><p>2900 S. Claiborne Ave.<br>New Orleans, LA 70125</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2900+S+Claiborne+Ave+New+Orleans+LA+70125\' target=\'_blank\'>Get Directions</a></p>', 29.940982, -90.0950148, 'ulta'],
  ['<p><strong>Ulta - Omaha # 0700</strong></p><p>14945 Evans Plaza<br>Omaha, NE 68164</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=14945+Evans+Plaza+Omaha+NE+68164\' target=\'_blank\'>Get Directions</a></p>', 41.2901151, -96.1473136, 'ulta'],
  ['<p><strong>Ulta - Newport # 703</strong></p><p>154 Pavilion Parkway<br>Newport, KY 41071</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=154+Pavilion+Parkway+Newport+KY+41071\' target=\'_blank\'>Get Directions</a></p>', 39.08949, -84.477822, 'ulta'],
  ['<p><strong>Ulta - Carbondale # 704</strong></p><p>1245 East Main<br>Carbondale, IL 62901</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1245+East+Main+Carbondale+IL+62901\' target=\'_blank\'>Get Directions</a></p>', 37.7299239, -89.1913628, 'ulta'],
  ['<p><strong>Ulta - Orlando # 706</strong></p><p>2654 E. Colonial Dr.<br>Orlando, FL 32803</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2654+E+Colonial+Dr+Orlando+FL+32803\' target=\'_blank\'>Get Directions</a></p>', 28.5531376, -81.3491285, 'ulta'],
  ['<p><strong>Ulta - Albuquerque # 0707</strong></p><p>2100 Louisiana Blvd NE 320<br>Albuquerque, NM 87110</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2100+Louisiana+Blvd+NE+320+Albuquerque+NM+87110\' target=\'_blank\'>Get Directions</a></p>', 35.080696, -106.5682653, 'ulta'],
  ['<p><strong>Ulta - Gadsden # 0709</strong></p><p>524 East Meighan Boulevard<br>Gadsden, AL 35903</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=524+East+Meighan+Boulevard+Gadsden+AL+35903\' target=\'_blank\'>Get Directions</a></p>', 34.0125676, -85.9897438, 'ulta'],
  ['<p><strong>Ulta - Visalia # 711</strong></p><p>4023 S. Mooney Blvd<br>Visalia, CA 93277</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4023+S+Mooney+Blvd+Visalia+CA+93277\' target=\'_blank\'>Get Directions</a></p>', 36.2942902, -119.3153696, 'ulta'],
  ['<p><strong>Ulta - Bay Shore # 714</strong></p><p>1701 Sunrise Highway<br>Bay Shore, NY 11706</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1701+Sunrise+Highway+Bay+Shore+NY+11706\' target=\'_blank\'>Get Directions</a></p>', 40.7396345, -73.24668, 'ulta'],
  ['<p><strong>Ulta - Midlothian # 721</strong></p><p>4632 Commonwealth Center Parkw<br>Midlothian, VA 23112</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4632+Commonwealth+Center+Parkw+Midlothian+VA+23112\' target=\'_blank\'>Get Directions</a></p>', 37.4183705, -77.6338008, 'ulta'],
  ['<p><strong>Ulta - Pocatello # 727</strong></p><p>4150 Yellowstone Ave.<br>Pocatello, ID 83202</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4150+Yellowstone+Ave+Pocatello+ID+83202\' target=\'_blank\'>Get Directions</a></p>', 42.9087072, -112.4648404, 'ulta'],
  ['<p><strong>Ulta - West Hills # 728</strong></p><p>6605 N. Fallbrook Ave.<br>West Hills, CA 91307</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6605+N+Fallbrook+Ave+West+Hills+CA+91307\' target=\'_blank\'>Get Directions</a></p>', 34.1893299, -118.6244264, 'ulta'],
  ['<p><strong>Ulta - Irvine # 0736</strong></p><p>13676 Jamboree Road<br>Irvine, CA 92602</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=13676+Jamboree+Road+Irvine+CA+92602\' target=\'_blank\'>Get Directions</a></p>', 33.7254323, -117.7896274, 'ulta'],
  ['<p><strong>Ulta - Raleigh # 741</strong></p><p>5900 Poyner Anchor Lane<br>Raleigh, NC 27616</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5900+Poyner+Anchor+Lane+Raleigh+NC+27616\' target=\'_blank\'>Get Directions</a></p>', 35.8654436, -78.5693414, 'ulta'],
  ['<p><strong>Ulta - Cincinnati # 744</strong></p><p>2699 Edmonson Rd.<br>Cincinnati, OH 45209</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2699+Edmonson+Rd+Cincinnati+OH+45209\' target=\'_blank\'>Get Directions</a></p>', 39.1455927, -84.4480338, 'ulta'],
  ['<p><strong>Ulta - Kansas City # 745</strong></p><p>8600 Ward Parkway<br>Kansas City, MO 64114</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8600+Ward+Parkway+Kansas+City+MO+64114\' target=\'_blank\'>Get Directions</a></p>', 38.9706721, -94.60684, 'ulta'],
  ['<p><strong>Ulta - Lakeland # 746</strong></p><p>3615 S. Florida Ave<br>Lakeland, FL 33803</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3615+S+Florida+Ave+Lakeland+FL+33803\' target=\'_blank\'>Get Directions</a></p>', 27.9983159, -81.9590645, 'ulta'],
  ['<p><strong>Ulta - Erie # 747</strong></p><p>2088 Interchange Rd.<br>Erie, PA 16565</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2088+Interchange+Rd+Erie+PA+16565\' target=\'_blank\'>Get Directions</a></p>', 42.0681078, -80.1039467, 'ulta'],
  ['<p><strong>Ulta - Prattville # 0752</strong></p><p>1466 Cotton Exchange<br>Prattville, AL 36066</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1466+Cotton+Exchange+Prattville+AL+36066\' target=\'_blank\'>Get Directions</a></p>', 32.4576228, -86.4076172, 'ulta'],
  ['<p><strong>Ulta - Vero Beach # 0754</strong></p><p>423 21st  Street<br>Vero Beach, FL 32960</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=423+21st++Street+Vero+Beach+FL+32960\' target=\'_blank\'>Get Directions</a></p>', 27.6385351, -80.383567, 'ulta'],
  ['<p><strong>Ulta - Las Vegas # 0757</strong></p><p>2310 Park Center Drive<br>Las Vegas, NV 89135</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2310+Park+Center+Drive+Las+Vegas+NV+89135\' target=\'_blank\'>Get Directions</a></p>', 36.1464814, -115.3323726, 'ulta'],
  ['<p><strong>Ulta - Longview # 759</strong></p><p>200 Triangle Center<br>Longview, WA 98632</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=200+Triangle+Center+Longview+WA+98632\' target=\'_blank\'>Get Directions</a></p>', 46.1441851, -122.9309254, 'ulta'],
  ['<p><strong>Ulta - Knoxville # 0760</strong></p><p>6710 Papermill Drive<br>Knoxville, TN 37919</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6710+Papermill+Drive+Knoxville+TN+37919\' target=\'_blank\'>Get Directions</a></p>', 35.9333893, -84.0151249, 'ulta'],
  ['<p><strong>Ulta - Manassas # 766</strong></p><p>10640 Sudley Manor Drive<br>Manassas, VA 20109</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10640+Sudley+Manor+Drive+Manassas+VA+20109\' target=\'_blank\'>Get Directions</a></p>', 38.7873663, -77.5163062, 'ulta'],
  ['<p><strong>Ulta - Midvale # 767</strong></p><p>900 East Fort Union Blvd. #52<br>Midvale, UT 84047</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=900+East+Fort+Union+Blvd+#52+Midvale+UT+84047\' target=\'_blank\'>Get Directions</a></p>', 40.6217362, -111.8628049, 'ulta'],
  ['<p><strong>Ulta - Plainville # 768</strong></p><p>240 New Britain Avenue<br>Plainville, CT 06062</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=240+New+Britain+Avenue+Plainville+CT+06062\' target=\'_blank\'>Get Directions</a></p>', 41.6769179, -72.8423327, 'ulta'],
  ['<p><strong>Ulta - Paducah # 771</strong></p><p>5161 Hinkleville Rd.<br>Paducah, KY 42001</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5161+Hinkleville+Rd+Paducah+KY+42001\' target=\'_blank\'>Get Directions</a></p>', 37.0769613, -88.6929864, 'ulta'],
  ['<p><strong>Ulta - Cupertino # 0777</strong></p><p>20580 Homestead Rd.<br>Cupertino, CA 95014</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=20580+Homestead+Rd+Cupertino+CA+95014\' target=\'_blank\'>Get Directions</a></p>', 37.3362298, -122.0335941, 'ulta'],
  ['<p><strong>Ulta - Fresno # 0778</strong></p><p>6587 North Riverside Drive<br>Fresno, CA 93722</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6587+North+Riverside+Drive+Fresno+CA+93722\' target=\'_blank\'>Get Directions</a></p>', 36.8341471, -119.9110808, 'ulta'],
  ['<p><strong>Ulta - North Little Rock # 0780</strong></p><p>2743 Lakewood Village Drive<br>North Little Rock, AR 72116</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2743+Lakewood+Village+Drive+North+Little+Rock+AR+72116\' target=\'_blank\'>Get Directions</a></p>', 34.7977344, -92.2316618, 'ulta'],
  ['<p><strong>Ulta - Clark # 0782</strong></p><p>1255 Raritan Rd<br>Clark, NJ 07066</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1255+Raritan+Rd+Clark+NJ+07066\' target=\'_blank\'>Get Directions</a></p>', 40.6319796, -74.3049906, 'ulta'],
  ['<p><strong>Ulta - Fairbanks # 0783</strong></p><p>357 Merhar Ave.<br>Fairbanks, AK 99701</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=357+Merhar+Ave+Fairbanks+AK+99701\' target=\'_blank\'>Get Directions</a></p>', 64.8575673, -147.7044157, 'ulta'],
  ['<p><strong>Ulta - Riverbank # 0784</strong></p><p>2407 Claribel Rd.<br>Riverbank, CA 95367</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2407+Claribel+Rd+Riverbank+CA+95367\' target=\'_blank\'>Get Directions</a></p>', 37.7119713, -120.9540191, 'ulta'],
  ['<p><strong>Ulta - Anchorage # 786</strong></p><p>1068 N. Muldoon Road<br>Anchorage, AK 99504</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1068+N+Muldoon+Road+Anchorage+AK+99504\' target=\'_blank\'>Get Directions</a></p>', 61.2283821, -149.7383121, 'ulta'],
  ['<p><strong>Ulta - Jonesboro # 790</strong></p><p>3031 E. Highland Drive<br>Jonesboro, AR 72401</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3031+E+Highland+Drive+Jonesboro+AR+72401\' target=\'_blank\'>Get Directions</a></p>', 35.8206538, -90.6675583, 'ulta'],
  ['<p><strong>Ulta - Compton # 0798</strong></p><p>1781 S. Alameda St<br>Compton, CA 90220</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1781+S+Alameda+St+Compton+CA+90220\' target=\'_blank\'>Get Directions</a></p>', 33.8761391, -118.2189908, 'ulta'],
  ['<p><strong>Ulta - Concord # 0799</strong></p><p>1975 Diamond Blvd<br>Concord, CA 94520</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1975+Diamond+Blvd+Concord+CA+94520\' target=\'_blank\'>Get Directions</a></p>', 37.9692709, -122.0562887, 'ulta'],
  ['<p><strong>Ulta - Northridge # 1001</strong></p><p>8941 Tampa Ave.<br>Northridge, CA 91324</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8941+Tampa+Ave+Northridge+CA+91324\' target=\'_blank\'>Get Directions</a></p>', 34.2330258, -118.5542182, 'ulta'],
  ['<p><strong>Ulta - Bismarck # 1005</strong></p><p>1461 East LaSalle Drive<br>Bismarck, ND 58503</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1461+East+LaSalle+Drive+Bismarck+ND+58503\' target=\'_blank\'>Get Directions</a></p>', 46.8597429, -100.7691013, 'ulta'],
  ['<p><strong>Ulta - Jacksonville Beach # 1010</strong></p><p>3928 3rd Street South<br>Jacksonville Beach, FL 32250</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3928+3rd+Street+South+Jacksonville+Beach+FL+32250\' target=\'_blank\'>Get Directions</a></p>', 30.2583893, -81.3918131, 'ulta'],
  ['<p><strong>Ulta - Cranberry Township # 1011</strong></p><p>20111 Route 19<br>Cranberry Township, PA 16066</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=20111+Route+19+Cranberry+Township+PA+16066\' target=\'_blank\'>Get Directions</a></p>', 40.6826985, -80.1030971, 'ulta'],
  ['<p><strong>Ulta - Cedar Falls # 1018</strong></p><p>416 Viking Plaza Drive<br>Cedar Falls, IA 50613</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=416+Viking+Plaza+Drive+Cedar+Falls+IA+50613\' target=\'_blank\'>Get Directions</a></p>', 42.4823529, -92.4416427, 'ulta'],
  ['<p><strong>Ulta - North Myrtle Beach # 1019</strong></p><p>1564 Highway 17 N.<br>North Myrtle Beach , SC 29582</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1564+Highway+17+N+North+Myrtle+Beach++SC+29582\' target=\'_blank\'>Get Directions</a></p>', 33.8427572, -78.6606479, 'ulta'],
  ['<p><strong>Ulta - Oxford # 1020</strong></p><p>600 Merchants Drive<br>Oxford, MS 38655</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=600+Merchants+Drive+Oxford+MS+38655\' target=\'_blank\'>Get Directions</a></p>', 34.3643257, -89.5694743, 'ulta'],
  ['<p><strong>Ulta - Aurora # 1027</strong></p><p>1150 South Ironton Street<br>Aurora, CO 80012</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1150+South+Ironton+Street+Aurora+CO+80012\' target=\'_blank\'>Get Directions</a></p>', 39.695616, -104.8629231, 'ulta'],
  ['<p><strong>Ulta - Barboursville # 1028</strong></p><p>810 Mall Road<br>Barboursville, WV 25504</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=810+Mall+Road+Barboursville+WV+25504\' target=\'_blank\'>Get Directions</a></p>', 38.4190876, -82.2650771, 'ulta'],
  ['<p><strong>Ulta - Greeley # 1033</strong></p><p>4126 Centerplace Drive<br>Greeley, CO 80634</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4126+Centerplace+Drive+Greeley+CO+80634\' target=\'_blank\'>Get Directions</a></p>', 40.3928526, -104.7453032, 'ulta'],
  ['<p><strong>Ulta - Myrtle Beach # 1034</strong></p><p>120 Sayebrook Parkway<br>Myrtle Beach, SC 29588</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=120+Sayebrook+Parkway+Myrtle+Beach+SC+29588\' target=\'_blank\'>Get Directions</a></p>', 33.6537418, -78.9826868, 'ulta'],
  ['<p><strong>Ulta - Christiana # 1036</strong></p><p>2130 Fashion Center Blvd<br>Newark, DE 19702</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2130+Fashion+Center+Blvd+Newark+DE+19702\' target=\'_blank\'>Get Directions</a></p>', 39.6720592, -75.6486287, 'ulta'],
  ['<p><strong>Ulta - Columbus # 1040</strong></p><p>508 18th Ave<br>Columbus, MS 39705</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=508+18th+Ave+Columbus+MS+39705\' target=\'_blank\'>Get Directions</a></p>', 33.5152947, -88.4328539, 'ulta'],
  ['<p><strong>Ulta - Valdosta # 1042</strong></p><p>1700 Norman Drive<br>Valdosta, GA 31601</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1700+Norman+Drive+Valdosta+GA+31601\' target=\'_blank\'>Get Directions</a></p>', 30.8437269, -83.3206503, 'ulta'],
  ['<p><strong>Ulta - Twin Falls # 1044</strong></p><p>1951 Fillmore Street<br>Twin Falls, ID 83301</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1951+Fillmore+Street+Twin+Falls+ID+83301\' target=\'_blank\'>Get Directions</a></p>', 42.5976075, -114.4576749, 'ulta'],
  ['<p><strong>Ulta - Waco # 1046</strong></p><p>2432 W. Loop 340<br>Waco, TX 76711</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2432+W+Loop+340+Waco+TX+76711\' target=\'_blank\'>Get Directions</a></p>', 31.4985988, -97.159576, 'ulta'],
  ['<p><strong>Ulta - San Antonio # 1047</strong></p><p>6065 NW Loop 410<br>San Antonio, TX 78238</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6065+NW+Loop+410+San+Antonio+TX+78238\' target=\'_blank\'>Get Directions</a></p>', 29.4757645, -98.6122366, 'ulta'],
  ['<p><strong>Ulta - Pickerington # 1048</strong></p><p>10701 Blacklick-Eastern Rd<br>Pickerington, OH 43147</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10701+Blacklick-Eastern+Rd+Pickerington+OH+43147\' target=\'_blank\'>Get Directions</a></p>', 39.9284375, -82.7861808, 'ulta'],
  ['<p><strong>Ulta - Menifee # 1049</strong></p><p>30050 Haun Road<br>Menifee, CA 92584</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=30050+Haun+Road+Menifee+CA+92584\' target=\'_blank\'>Get Directions</a></p>', 33.6774699, -117.1757347, 'ulta'],
  ['<p><strong>Ulta - Texarkana # 1050</strong></p><p>3347 Mall Drive<br>Texarkana, TX 75503</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3347+Mall+Drive+Texarkana+TX+75503\' target=\'_blank\'>Get Directions</a></p>', 33.4576757, -94.0790085, 'ulta'],
  ['<p><strong>Ulta - Lewisville # 1052</strong></p><p>4750 State Hwy 121<br>Lewisville, TX 75056</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4750+State+Hwy+121+Lewisville+TX+75056\' target=\'_blank\'>Get Directions</a></p>', 33.0635228, -96.8857867, 'ulta'],
  ['<p><strong>Ulta - Tigard # 1053</strong></p><p>10206 SW Washington Square Road<br>Tigard, OR 97223</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10206+SW+Washington+Square+Road+Tigard+OR+97223\' target=\'_blank\'>Get Directions</a></p>', 45.4465784, -122.7770904, 'ulta'],
  ['<p><strong>Ulta - Bellevue # 1055</strong></p><p>15600 N.E. 8th Street #F15<br>Bellevue, WA 98008</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15600+NE+8th+Street+#F15+Bellevue+WA+98008\' target=\'_blank\'>Get Directions</a></p>', 47.6187131, -122.1314311, 'ulta'],
  ['<p><strong>Ulta - Paso Robles # 1063</strong></p><p>2145 Theatre Drive<br>Paso Robles, CA 93446</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2145+Theatre+Drive+Paso+Robles+CA+93446\' target=\'_blank\'>Get Directions</a></p>', 35.5853268, -120.6985072, 'ulta'],
  ['<p><strong>Ulta - King of Prussia # 1067</strong></p><p>131 Town Square Place<br>King of Prussia, PA 19406</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=131+Town+Square+Place+King+of+Prussia+PA+19406\' target=\'_blank\'>Get Directions</a></p>', 40.0826552, -75.404703, 'ulta'],
  ['<p><strong>Ulta - Scranton # 1069</strong></p><p>100 Viewmont Mall<br>Scranton, PA 18508</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=100+Viewmont+Mall+Scranton+PA+18508\' target=\'_blank\'>Get Directions</a></p>', 41.4588283, -75.6546124, 'ulta'],
  ['<p><strong>Ulta - Miami # 1077</strong></p><p>10001 W. Flagler Street<br>Miami, FL 33174</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10001+W+Flagler+Street+Miami+FL+33174\' target=\'_blank\'>Get Directions</a></p>', 25.77145, -80.3591438, 'ulta'],
  ['<p><strong>Ulta - St. Louis Park # 1079</strong></p><p>8338 State Highway 7<br>St. Louis Park, MN 55426</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8338+State+Highway+7+St+Louis+Park+MN+55426\' target=\'_blank\'>Get Directions</a></p>', 44.937619, -93.384668, 'ulta'],
  ['<p><strong>Ulta - Roseville # 1082</strong></p><p>32295 Gratiot Ave.<br>Roseville, MI 48066</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=32295+Gratiot+Ave+Roseville+MI+48066\' target=\'_blank\'>Get Directions</a></p>', 42.5348083, -82.9166976, 'ulta'],
  ['<p><strong>Ulta - Upper Arlington # 1091</strong></p><p>1645-1649 West Lane Avenue<br>Upper Arlington, OH 43221</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1645-1649+West+Lane+Avenue+Upper+Arlington+OH+43221\' target=\'_blank\'>Get Directions</a></p>', 40.0067704, -83.0544867, 'ulta'],
  ['<p><strong>Ulta - Brownsville # 1092</strong></p><p>543 East Morrison Road<br>Brownsville, TX 78526</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=543+East+Morrison+Road+Brownsville+TX+78526\' target=\'_blank\'>Get Directions</a></p>', 25.9681165, -97.5073809, 'ulta'],
  ['<p><strong>Ulta - Simi Valley # 1093</strong></p><p>1555 Simi Town Center Way<br>Simi Valley, CA 93065</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1555+Simi+Town+Center+Way+Simi+Valley+CA+93065\' target=\'_blank\'>Get Directions</a></p>', 34.2839557, -118.7701465, 'ulta'],
  ['<p><strong>Ulta - Peachtree City # 1095</strong></p><p>202 Line Creek Drive<br>Peachtree City, GA 30269</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=202+Line+Creek+Drive+Peachtree+City+GA+30269\' target=\'_blank\'>Get Directions</a></p>', 33.3948217, -84.6019955, 'ulta'],
  ['<p><strong>Ulta - Sioux City # 1101</strong></p><p>5747 Sunnybrook Dr. <br>Sioux City, IA 51106</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5747+Sunnybrook+Dr++Sioux+City+IA+51106\' target=\'_blank\'>Get Directions</a></p>', 42.4514439, -96.3339898, 'ulta'],
  ['<p><strong>Ulta - Poughkeepsie # 1103</strong></p><p>2532 South Road (U.S. Route 9)<br>Poughkeepsie, NY 12601</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2532+South+Road+(US+Route+9)+Poughkeepsie+NY+12601\' target=\'_blank\'>Get Directions</a></p>', 41.662343, -73.928033, 'ulta'],
  ['<p><strong>Ulta - Las Cruces # 1104</strong></p><p>700 South Telshor Blvd<br>Las Cruces, NM 88011</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=700+South+Telshor+Blvd+Las+Cruces+NM+88011\' target=\'_blank\'>Get Directions</a></p>', 32.3106108, -106.7431832, 'ulta'],
  ['<p><strong>Ulta - Rocklin # 1105</strong></p><p>5120 Commons Drive<br>Rocklin, CA 95677</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5120+Commons+Drive+Rocklin+CA+95677\' target=\'_blank\'>Get Directions</a></p>', 38.8025002, -121.2090557, 'ulta'],
  ['<p><strong>Ulta - La Habra # 1107</strong></p><p>1521 W Imperial Hwy<br>La Habra, CA 90631</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1521+W+Imperial+Hwy+La+Habra+CA+90631\' target=\'_blank\'>Get Directions</a></p>', 33.9189227, -117.9625176, 'ulta'],
  ['<p><strong>Ulta - Cullman # 1115</strong></p><p>1216 Cullman Shopping Center<br>Cullman, AL 35055</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1216+Cullman+Shopping+Center+Cullman+AL+35055\' target=\'_blank\'>Get Directions</a></p>', 34.18259, -86.851035, 'ulta'],
  ['<p><strong>Ulta - Las Vegas # 1117</strong></p><p>6341 North Decatur Blvd<br>Las Vegas, NV 89130</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6341+North+Decatur+Blvd+Las+Vegas+NV+89130\' target=\'_blank\'>Get Directions</a></p>', 36.2731226, -115.2077663, 'ulta'],
  ['<p><strong>Ulta - Ammon # 1123</strong></p><p>1967 S. 25th E.<br>Ammon, ID 83406</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1967+S+25th+E+Ammon+ID+83406\' target=\'_blank\'>Get Directions</a></p>', 43.4796911, -111.9823899, 'ulta'],
  ['<p><strong>Ulta - Frisco # 1126</strong></p><p>4995 Eldorado Parkway<br>Frisco, TX 75034</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4995+Eldorado+Parkway+Frisco+TX+75034\' target=\'_blank\'>Get Directions</a></p>', 33.1732418, -96.8435038, 'ulta'],
  ['<p><strong>Ulta - Salinas #1127</strong></p><p>860 Northridge Shopping Center<br>Salinas, CA 93906</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=860+Northridge+Shopping+Center+Salinas+CA+93906\' target=\'_blank\'>Get Directions</a></p>', 36.72093, -121.6577568, 'ulta'],
  ['<p><strong>Ulta - Naples # 1128</strong></p><p>13100 Tamiami Trail East<br>Naples, FL 34114</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=13100+Tamiami+Trail+East+Naples+FL+34114\' target=\'_blank\'>Get Directions</a></p>', 26.0602326, -81.6964595, 'ulta'],
  ['<p><strong>Ulta - Springfield # 1129</strong></p><p>3000 Gateway St. #222<br>Springfield, OR 97477</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3000+Gateway+St+#222+Springfield+OR+97477\' target=\'_blank\'>Get Directions</a></p>', 44.0729862, -123.0454292, 'ulta'],
  ['<p><strong>Ulta - Janesville # 1130</strong></p><p>2500 Milton Avenue<br>Janesville, WI 53545</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2500+Milton+Avenue+Janesville+WI+53545\' target=\'_blank\'>Get Directions</a></p>', 42.7127343, -88.9988228, 'ulta'],
  ['<p><strong>Ulta - Temecula # 1131</strong></p><p>40460 Winchester Road<br>Temecula, CA 92591</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=40460+Winchester+Road+Temecula+CA+92591\' target=\'_blank\'>Get Directions</a></p>', 33.5286347, -117.1549612, 'ulta'],
  ['<p><strong>Ulta - Chattanooga # 1139</strong></p><p>366 Northgate Mall Dr.  <br>Chattanooga, TN 37415</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=366+Northgate+Mall+Dr ++Chattanooga+TN+37415\' target=\'_blank\'>Get Directions</a></p>', 35.129031, -85.2407199, 'ulta'],
  ['<p><strong>Ulta - Cypress # 1140</strong></p><p>28702 Highway 290<br>Cypress, TX 77433</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=28702+Highway+290+Cypress+TX+77433\' target=\'_blank\'>Get Directions</a></p>', 30.1166557, -96.0861166, 'ulta'],
  ['<p><strong>Ulta - Statesboro # 1142</strong></p><p>379 Henry Blvd.  <br>Statesboro, GA 30458</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=379+Henry+Blvd+++Statesboro+GA+30458\' target=\'_blank\'>Get Directions</a></p>', 32.4296649, -81.7612268, 'ulta'],
  ['<p><strong>Ulta - Allentown # 1144</strong></p><p>833 North Krocks Road<br>Allentown, PA 18106</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=833+North+Krocks+Road+Allentown+PA+18106\' target=\'_blank\'>Get Directions</a></p>', 40.564466, -75.5617852, 'ulta'],
  ['<p><strong>Ulta - Castle Rock # 1146</strong></p><p>6378 Promenade Pkwy<br>Castle Rock, CO 80108</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6378+Promenade+Pkwy+Castle+Rock+CO+80108\' target=\'_blank\'>Get Directions</a></p>', 39.4221735, -104.876156, 'ulta'],
  ['<p><strong>Ulta - Minot # 1147</strong></p><p>2400 10th Street SW<br>Minot, ND 58701</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2400+10th+Street+SW+Minot+ND+58701\' target=\'_blank\'>Get Directions</a></p>', 48.2062577, -101.3116721, 'ulta'],
  ['<p><strong>Ulta - Mt. Pleasant # 1148</strong></p><p>5630-1 Washington Ave.<br>Mt. Pleasant, WI 53406</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5630-1+Washington+Ave+Mt+Pleasant+WI+53406\' target=\'_blank\'>Get Directions</a></p>', 42.7214808, -87.8484028, 'ulta'],
  ['<p><strong>Ulta - Dunwoody # 1151</strong></p><p>4737 Ashford Dunwoody Road<br>Dunwoody, GA 30338</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4737+Ashford+Dunwoody+Road+Dunwoody+GA+30338\' target=\'_blank\'>Get Directions</a></p>', 33.9338419, -84.3376415, 'ulta'],
  ['<p><strong>Ulta - Lodi # 1152</strong></p><p>1423 South Lower Sacramento Road<br>Lodi, CA 95242</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1423+South+Lower+Sacramento+Road+Lodi+CA+95242\' target=\'_blank\'>Get Directions</a></p>', 38.1144553, -121.3070681, 'ulta'],
  ['<p><strong>Ulta - Riverside # 1153</strong></p><p>3502 Tyler Street<br>Riverside, CA 92503</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3502+Tyler+Street+Riverside+CA+92503\' target=\'_blank\'>Get Directions</a></p>', 33.9067225, -117.4577494, 'ulta'],
  ['<p><strong>Ulta - Cheyenne # 1159</strong></p><p>1400 Dell Range Blvd<br>Cheyenne, WY 82009</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1400+Dell+Range+Blvd+Cheyenne+WY+82009\' target=\'_blank\'>Get Directions</a></p>', 41.1622028, -104.8050567, 'ulta'],
  ['<p><strong>Ulta - Cincinnati # 1163</strong></p><p>700 Eastgate South Drive<br>Cincinnati, OH 45245</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=700+Eastgate+South+Drive+Cincinnati+OH+45245\' target=\'_blank\'>Get Directions</a></p>', 39.0960049, -84.2725685, 'ulta'],
  ['<p><strong>Ulta - Edinburg # 1164</strong></p><p>591 East Trenton Road<br>Edinburg, TX 78539</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=591+East+Trenton+Road+Edinburg+TX+78539\' target=\'_blank\'>Get Directions</a></p>', 26.2659458, -98.1671013, 'ulta'],
  ['<p><strong>Ulta - Reno # 1167</strong></p><p>4891 Kietzke Lane<br>Reno, NV 89509</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4891+Kietzke+Lane+Reno+NV+89509\' target=\'_blank\'>Get Directions</a></p>', 39.4795425, -119.794064, 'ulta'],
  ['<p><strong>Ulta - Fort Collins # 1168</strong></p><p>190 East Foothills Pkwy<br>Fort Collins, CO 80525</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=190+East+Foothills+Pkwy+Fort+Collins+CO+80525\' target=\'_blank\'>Get Directions</a></p>', 40.5441162, -105.0747728, 'ulta'],
  ['<p><strong>Ulta - Waxahachie # 1169</strong></p><p>1700 North Hwy 77<br>Waxahachie, TX 75165</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1700+North+Hwy+77+Waxahachie+TX+75165\' target=\'_blank\'>Get Directions</a></p>', 32.4305232, -96.8358536, 'ulta'],
  ['<p><strong>Ulta - Lancaster # 1170</strong></p><p>1575 Fruitville Pike Suite 4<br>Lancaster, PA 17601</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1575+Fruitville+Pike+Suite+4+Lancaster+PA+17601\' target=\'_blank\'>Get Directions</a></p>', 40.0648574, -76.3144962, 'ulta'],
  ['<p><strong>Ulta - Bel Air # 1173</strong></p><p>615 Bel Air Road<br>Bel Air, MD 21014</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=615+Bel+Air+Road+Bel+Air+MD+21014\' target=\'_blank\'>Get Directions</a></p>', 39.5240987, -76.3543729, 'ulta'],
  ['<p><strong>Ulta - Baytown # 1175</strong></p><p>6345 Garth Road<br>Baytown, TX 77521</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6345+Garth+Road+Baytown+TX+77521\' target=\'_blank\'>Get Directions</a></p>', 29.7924004, -94.9829883, 'ulta'],
  ['<p><strong>Ulta - Pittsburgh # 1177</strong></p><p>6240 Northway Drive<br>Pittsburgh, PA 15237</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6240+Northway+Drive+Pittsburgh+PA+15237\' target=\'_blank\'>Get Directions</a></p>', 40.551374, -80.021161, 'ulta'],
  ['<p><strong>Ulta - San Clemente # 1181</strong></p><p>510 Camino de Estrella<br>San Clemente, CA 92672</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=510+Camino+de+Estrella+San+Clemente+CA+92672\' target=\'_blank\'>Get Directions</a></p>', 33.4563835, -117.6561088, 'ulta'],
  ['<p><strong>Ulta - Fairfield # 1182</strong></p><p>1350 Travis Blvd<br>Fairfield, CA 94533</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1350+Travis+Blvd+Fairfield+CA+94533\' target=\'_blank\'>Get Directions</a></p>', 38.2600628, -122.0537367, 'ulta'],
  ['<p><strong>Ulta - Suffolk # 1183</strong></p><p>1011 University Blvd<br>Suffolk, VA 23435</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1011+University+Blvd+Suffolk+VA+23435\' target=\'_blank\'>Get Directions</a></p>', 36.8719857, -76.4203331, 'ulta'],
  ['<p><strong>Ulta - Oklahoma City # 1185</strong></p><p>1700 Belle Isle Blvd<br>Oklahoma City, OK 73118</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1700+Belle+Isle+Blvd+Oklahoma+City+OK+73118\' target=\'_blank\'>Get Directions</a></p>', 35.525017, -97.5359787, 'ulta'],
  ['<p><strong>Ulta - Lufkin # 1188</strong></p><p>4419 South Medford Drive<br>Lufkin, TX 75901</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4419+South+Medford+Drive+Lufkin+TX+75901\' target=\'_blank\'>Get Directions</a></p>', 31.311225, -94.722458, 'ulta'],
  ['<p><strong>Ulta - Niagara Falls # 1192</strong></p><p>1520 Military Road<br>Niagara Falls, NY 14304</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1520+Military+Road+Niagara+Falls+NY+14304\' target=\'_blank\'>Get Directions</a></p>', 43.0933904, -78.974691, 'ulta'],
  ['<p><strong>Ulta - Fenton # 1193</strong></p><p>3259 Owen Road<br>Fenton, MI 48430</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3259+Owen+Road+Fenton+MI+48430\' target=\'_blank\'>Get Directions</a></p>', 42.7869262, -83.7386364, 'ulta'],
  ['<p><strong>Ulta - Sarasota # 1196</strong></p><p>8240 South Tamiami Trail<br>Sarasota, FL 34238</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8240+South+Tamiami+Trail+Sarasota+FL+34238\' target=\'_blank\'>Get Directions</a></p>', 27.2310116, -82.4966394, 'ulta'],
  ['<p><strong>Ulta - Smyrna # 1201</strong></p><p>837 Industrial Blvd<br>Smyrna, TN 37167</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=837+Industrial+Blvd+Smyrna+TN+37167\' target=\'_blank\'>Get Directions</a></p>', 35.9792861, -86.5675561, 'ulta'],
  ['<p><strong>Ulta - Brick Township # 1204</strong></p><p>70 Brick Plaza<br>Brick, NJ 08723</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=70+Brick+Plaza+Brick+NJ+08723\' target=\'_blank\'>Get Directions</a></p>', 40.0587288, -74.1419003, 'ulta'],
  ['<p><strong>Ulta - Orange # 1206</strong></p><p>1500 East Village Way<br>Orange, CA 92865</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1500+East+Village+Way+Orange+CA+92865\' target=\'_blank\'>Get Directions</a></p>', 33.8255553, -117.838103, 'ulta'],
  ['<p><strong>Ulta - Canton Township # 1207</strong></p><p>44540 Ford Road<br>Canton Township, MI 48187</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=44540+Ford+Road+Canton+Township+MI+48187\' target=\'_blank\'>Get Directions</a></p>', 42.3237798, -83.4804413, 'ulta'],
  ['<p><strong>Ulta - Valley Stream # 1209</strong></p><p>750 West Sunrise Hwy<br>Valley Stream, NY 11582</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=750+West+Sunrise+Hwy+Valley+Stream+NY+11582\' target=\'_blank\'>Get Directions</a></p>', 40.6635113, -73.7264325, 'ulta'],
  ['<p><strong>Ulta - Tampa # 1210</strong></p><p>15732 North Dale Mabry Hwy<br>Tampa, FL 33618</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15732+North+Dale+Mabry+Hwy+Tampa+FL+33618\' target=\'_blank\'>Get Directions</a></p>', 28.0964243, -82.5041808, 'ulta'],
  ['<p><strong>Ulta - Seminole # 1211</strong></p><p>7976 113th Street N<br>Seminole, FL 33772</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7976+113th+Street+N+Seminole+FL+33772\' target=\'_blank\'>Get Directions</a></p>', 27.8446947, -82.7942402, 'ulta'],
  ['<p><strong>Ulta - Santa Monica # 1213</strong></p><p>1234 Wilshire Blvd<br>Santa Monica, CA 90403</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1234+Wilshire+Blvd+Santa+Monica+CA+90403\' target=\'_blank\'>Get Directions</a></p>', 34.0256276, -118.4898892, 'ulta'],
  ['<p><strong>Ulta - Chico # 1215</strong></p><p>2068 Dr. Martin Luther King Jr. Pkwy<br>Chico, CA 95928</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2068+Dr+Martin+Luther+King+Jr+Pkwy+Chico+CA+95928\' target=\'_blank\'>Get Directions</a></p>', 39.7218524, -121.8093188, 'ulta'],
  ['<p><strong>Ulta - Houston # 1217</strong></p><p>2732 Eldridge Parkway<br>Houston, TX 77082</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2732+Eldridge+Parkway+Houston+TX+77082\' target=\'_blank\'>Get Directions</a></p>', 29.7323396, -95.6251777, 'ulta'],
  ['<p><strong>Ulta - Charlotte # 1219</strong></p><p>7211 Waverly Walk Ave<br>Charlotte, NC 28277</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7211+Waverly+Walk+Ave+Charlotte+NC+28277\' target=\'_blank\'>Get Directions</a></p>', 35.0534768, -80.7673466, 'ulta'],
  ['<p><strong>Ulta - Sherman Oaks # 1221</strong></p><p>4550 North Van Nuys Blvd.<br>Sherman Oaks, CA 91403</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4550+North+Van+Nuys+Blvd+Sherman+Oaks+CA+91403\' target=\'_blank\'>Get Directions</a></p>', 34.15475, -118.4476698, 'ulta'],
  ['<p><strong>Ulta - Norwalk # 1227</strong></p><p>650 Main Avenue<br>Norwalk, CT 06851</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=650+Main+Avenue+Norwalk+CT+06851\' target=\'_blank\'>Get Directions</a></p>', 41.1591183, -73.4175793, 'ulta'],
  ['<p><strong>Ulta - Beavercreek # 1228</strong></p><p>27 Greene Blvd<br>Beavercreek, OH 45440</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=27+Greene+Blvd+Beavercreek+OH+45440\' target=\'_blank\'>Get Directions</a></p>', 39.6960367, -84.1041737, 'ulta'],
  ['<p><strong>Ulta - Cedar Park # 1230</strong></p><p>SWC of New Hope and 183A<br>Cedar Park, TX 78613</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=SWC+of+New+Hope+and+183A+Cedar+Park+TX+78613\' target=\'_blank\'>Get Directions</a></p>', 30.5113628, -97.8119442, 'ulta'],
  ['<p><strong>Ulta - Redding # 1238</strong></p><p>900 Dana Drive D15<br>Redding, CA 96003</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=900+Dana+Drive+D15+Redding+CA+96003\' target=\'_blank\'>Get Directions</a></p>', 40.5882757, -122.3554131, 'ulta'],
  ['<p><strong>Ulta - Houston # 1239</strong></p><p>14275 E. Sam Houston Parkway North<br>Houston, TX 77044</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=14275+E+Sam+Houston+Parkway+North+Houston+TX+77044\' target=\'_blank\'>Get Directions</a></p>', 29.9268239, -95.2046902, 'ulta'],
  ['<p><strong>Ulta - Shelby Twp (Stoney Creek) #124</strong></p><p>7728 26 Mile Road<br>Shelby Township, MI 48316</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7728+26+Mile+Road+Shelby+Township+MI+48316\' target=\'_blank\'>Get Directions</a></p>', 42.710958, -83.0369047, 'ulta'],
  ['<p><strong>Ulta - Spring # 1242</strong></p><p>6766 N. Grand Parkway W<br>Spring, TX 77389</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6766+N+Grand+Parkway+W+Spring+TX+77389\' target=\'_blank\'>Get Directions</a></p>', 30.0875319, -95.5198415, 'ulta'],
  ['<p><strong>Ulta - Bellingham # 1244</strong></p><p>249 Hartford Avenue<br>Bellingham, MA 02019</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=249+Hartford+Avenue+Bellingham+MA+02019\' target=\'_blank\'>Get Directions</a></p>', 42.1127873, -71.46231, 'ulta'],
  ['<p><strong>Ulta - Edmond # 1245</strong></p><p>310 South Bryant Avenue<br>Edmund, OK 73034</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=310+South+Bryant+Avenue+Edmund+OK+73034\' target=\'_blank\'>Get Directions</a></p>', 35.6518936, -97.4604581, 'ulta'],
  ['<p><strong>Ulta - Warner Robbins # 1246</strong></p><p>2529 Watson Blvd<br>Warner Robins, GA 31093</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2529+Watson+Blvd+Warner+Robins+GA+31093\' target=\'_blank\'>Get Directions</a></p>', 32.6177035, -83.6658086, 'ulta'],
  ['<p><strong>Ulta - Newtown Square # 1247</strong></p><p>3735 West Chester Pike<br>Newton Square, PA 19073</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3735+West+Chester+Pike+Newton+Square+PA+19073\' target=\'_blank\'>Get Directions</a></p>', 39.9871685, -75.4032424, 'ulta'],
  ['<p><strong>Ulta - Wichita # 1248</strong></p><p>2734 North Greenwich Court<br>Wichita, KS 67226</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2734+North+Greenwich+Court+Wichita+KS+67226\' target=\'_blank\'>Get Directions</a></p>', 37.7332257, -97.2038649, 'ulta'],
  ['<p><strong>Ulta - Hemet # 1250</strong></p><p>2243 W. Florida Ave<br>Hemet, CA 92545</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2243+W+Florida+Ave+Hemet+CA+92545\' target=\'_blank\'>Get Directions</a></p>', 33.7459949, -116.9957736, 'ulta'],
  ['<p><strong>Ulta - Hattiesburg # 1252</strong></p><p>1000 Turtle Creek Drive<br>Hattiesburg, MS 39402</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1000+Turtle+Creek+Drive+Hattiesburg+MS+39402\' target=\'_blank\'>Get Directions</a></p>', 31.3255028, -89.3754792, 'ulta'],
  ['<p><strong>Ulta - Las Vegas # 1254</strong></p><p>6689 Las Vegas Blvd. South<br>Las Vegas, NV 98119</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=6689+Las+Vegas+Blvd+South+Las+Vegas+NV+98119\' target=\'_blank\'>Get Directions</a></p>', 36.0676289, -115.1742472, 'ulta'],
  ['<p><strong>Ulta - San Jose # 1256</strong></p><p>1038 East Brokaw Road<br>San Jose, CA 95131</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1038+East+Brokaw+Road+San+Jose+CA+95131\' target=\'_blank\'>Get Directions</a></p>', 37.3822597, -121.8983116, 'ulta'],
  ['<p><strong>Ulta - Eagan # 1257</strong></p><p>1400 Central Park Commons Drive<br>Eagan, MN 55121</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1400+Central+Park+Commons+Drive+Eagan+MN+55121\' target=\'_blank\'>Get Directions</a></p>', 44.8361079, -93.1680825, 'ulta'],
  ['<p><strong>Ulta - San Jose # 1259</strong></p><p>5140 Cherry Avenue<br>San Jose, CA 95118</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5140+Cherry+Avenue+San+Jose+CA+95118\' target=\'_blank\'>Get Directions</a></p>', 37.2575104, -121.874317, 'ulta'],
  ['<p><strong>Ulta - Meridian # 1269</strong></p><p>2330 North Eagle Road<br>Meridian, ID 83646</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2330+North+Eagle+Road+Meridian+ID+83646\' target=\'_blank\'>Get Directions</a></p>', 43.625979, -116.3518698, 'ulta'],
  ['<p><strong>Ulta - American Fork # 1273</strong></p><p>251 North Meadow Lane<br>American Fork, UT 84003</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=251+North+Meadow+Lane+American+Fork+UT+84003\' target=\'_blank\'>Get Directions</a></p>', 40.3821599, -111.821408, 'ulta'],
  ['<p><strong>Ulta - Ontario # 1280</strong></p><p>One Ontario Mills Circle<br>Ontario, CA 91764</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=One+Ontario+Mills+Circle+Ontario+CA+91764\' target=\'_blank\'>Get Directions</a></p>', 34.0729572, -117.5519737, 'ulta'],
  ['<p><strong>Ulta - Farmington # 1281</strong></p><p>4601 East Main Street<br>Farmington, NM 87402</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4601+East+Main+Street+Farmington+NM+87402\' target=\'_blank\'>Get Directions</a></p>', 36.7626831, -108.1506494, 'ulta'],
  ['<p><strong>Ulta - Danbury # 1282</strong></p><p>7 Backus Ave<br>Danbury, CT 06810</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7+Backus+Ave+Danbury+CT+06810\' target=\'_blank\'>Get Directions</a></p>', 41.3800517, -73.4817327, 'ulta'],
  ['<p><strong>Ulta - Yorktown Heights # 1283</strong></p><p>650 Lee Blvd<br>Yorktown Heights, NY 10598</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=650+Lee+Blvd+Yorktown+Heights+NY+10598\' target=\'_blank\'>Get Directions</a></p>', 41.3286166, -73.8077192, 'ulta'],
  ['<p><strong>Ulta - Olathe # 1284</strong></p><p>14621 West 119th Street<br>Olathe, KS 66062</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=14621+West+119th+Street+Olathe+KS+66062\' target=\'_blank\'>Get Directions</a></p>', 38.9111189, -94.756499, 'ulta'],
  ['<p><strong>Ulta - Enid # 1289</strong></p><p>4408 W. Owen Garriott Rd<br>Enid, OK 73703</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4408+W+Owen+Garriott+Rd+Enid+OK+73703\' target=\'_blank\'>Get Directions</a></p>', 36.3926101, -97.932899, 'ulta'],
  ['<p><strong>Ulta - Memphis # 1292</strong></p><p>4572 Poplar Avenue Suite 103<br>Memphis, TN 38117</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4572+Poplar+Avenue+Suite+103+Memphis+TN+38117\' target=\'_blank\'>Get Directions</a></p>', 35.1191085, -89.9096987, 'ulta'],
  ['<p><strong>Ulta - Bellingham # 1293</strong></p><p>One Bellis Fair Pkwy<br>Bellingham, WA 98226</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=One+Bellis+Fair+Pkwy+Bellingham+WA+98226\' target=\'_blank\'>Get Directions</a></p>', 48.785786, -122.4906239, 'ulta'],
  ['<p><strong>Ulta - Huntington Beach # 1299</strong></p><p>10071 Adams Ave<br>Huntington Beach, CA 92646</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10071+Adams+Ave+Huntington+Beach+CA+92646\' target=\'_blank\'>Get Directions</a></p>', 33.673672, -117.9520844, 'ulta'],
  ['<p><strong>Ulta - Thousand Oaks # 1302</strong></p><p>205 N. Moorpark Road<br>Thousand Oaks, CA 91360</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=205+N+Moorpark+Road+Thousand+Oaks+CA+91360\' target=\'_blank\'>Get Directions</a></p>', 34.1833874, -118.8769574, 'ulta'],
  ['<p><strong>Ulta - Marysville # 1309</strong></p><p>2551 172nd Street NE<br>Marysville, WA 98271</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2551+172nd+Street+NE+Marysville+WA+98271\' target=\'_blank\'>Get Directions</a></p>', 48.1541013, -122.1957686, 'ulta'],
  ['<p><strong>Ulta - Seattle # 1310</strong></p><p>2600 SW Barton Street<br>Seattle, WA 98126</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2600+SW+Barton+Street+Seattle+WA+98126\' target=\'_blank\'>Get Directions</a></p>', 47.5221867, -122.3671823, 'ulta'],
  ['<p><strong>Ulta - Dallas # 1311</strong></p><p>5550 W. Lovers Lane<br>Dallas, TX 75209</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5550+W+Lovers+Lane+Dallas+TX+75209\' target=\'_blank\'>Get Directions</a></p>', 32.8506249, -96.8183033, 'ulta'],
  ['<p><strong>Ulta - Johnson City # 1312</strong></p><p>2011 North Roan Street<br>Johnson City, TN 37601</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2011+North+Roan+Street+Johnson+City+TN+37601\' target=\'_blank\'>Get Directions</a></p>', 36.3393783, -82.3766221, 'ulta'],
  ['<p><strong>Ulta - La Quinta # 1314</strong></p><p>78-825 Highway 111<br>La Quinta, CA 92253</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=78-825+Highway+111+La+Quinta+CA+92253\' target=\'_blank\'>Get Directions</a></p>', 33.7110799, -116.2927465, 'ulta'],
  ['<p><strong>Ulta - Panama City Beach # 1349</strong></p><p>15600 Panama City Beach Parkway<br>Panama City, FL 32413</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15600+Panama+City+Beach+Parkway+Panama+City+FL+32413\' target=\'_blank\'>Get Directions</a></p>', 30.2233819, -85.8669348, 'ulta'],
  ['<p><strong>Ulta - Mobile # 1351</strong></p><p>7765 Airport Blvd<br>Mobile, AL 36608</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7765+Airport+Blvd+Mobile+AL+36608\' target=\'_blank\'>Get Directions</a></p>', 30.6820079, -88.2242489, 'ulta'],
  ['<p><strong>Ulta - Naples # 1370</strong></p><p>2334 Pine Ridge Road<br>Naples, FL 34109</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2334+Pine+Ridge+Road+Naples+FL+34109\' target=\'_blank\'>Get Directions</a></p>', 26.2086585, -81.7703514, 'ulta'],
  ['<p><strong>Ulta - Kapolei # 1459</strong></p><p>4450 Kapolei Parkway Space 230<br>Kapolei, HI 96707</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4450+Kapolei+Parkway+Space+230+Kapolei+HI+96707\' target=\'_blank\'>Get Directions</a></p>', 21.3295193, -158.0915164, 'ulta'],
  ['<p><strong>Ulta - ORLAND PARK #7</strong></p><p>15754 S. LaGrange Road<br>Orland Park, IL 60462</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15754+S+LaGrange+Road+Orland+Park+IL+60462\' target=\'_blank\'>Get Directions</a></p>', 41.6041613, -87.854173, 'ulta'],
  ['<p><strong>Ulta - LOUISVILLE  #113</strong></p><p>4292 Summit Plaza Drive<br>Louisville, KY 40241</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4292+Summit+Plaza+Drive+Louisville+KY+40241\' target=\'_blank\'>Get Directions</a></p>', 38.3096122, -85.5778122, 'ulta'],
  ['<p><strong>Ulta - CERRITOS #155</strong></p><p>12771 Towne Center Drive<br>Cerritos, CA 90703</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=12771+Towne+Center+Drive+Cerritos+CA+90703\' target=\'_blank\'>Get Directions</a></p>', 33.8706572, -118.0589047, 'ulta'],
  ['<p><strong>Ulta - MT. PLEASANT #201</strong></p><p>1740 Towne Center Way<br>Mt. Pleasant, SC 29464</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1740+Towne+Center+Way+Mt+Pleasant+SC+29464\' target=\'_blank\'>Get Directions</a></p>', 32.8288799, -79.8308997, 'ulta'],
  ['<p><strong>Ulta - FT. SMITH # 236</strong></p><p>3985 Phoenix Avenue<br>Fort Smith, AR 72903</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3985+Phoenix+Avenue+Fort+Smith+AR+72903\' target=\'_blank\'>Get Directions</a></p>', 35.3413235, -94.388557, 'ulta'],
  ['<p><strong>Ulta - Montvale # 1072</strong></p><p>32 Farm View<br>Montvale, NJ 07645</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=32+Farm+View+Montvale+NJ+07645\' target=\'_blank\'>Get Directions</a></p>', 41.0514715, -74.0611109, 'ulta'],
  ['<p><strong>Ulta - Sacramento # 1119</strong></p><p>8180 Delta Shores Cir S<br>Sacramento, CA 95832</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8180+Delta+Shores+Cir+S+Sacramento+CA+95832\' target=\'_blank\'>Get Directions</a></p>', 38.4632858, -121.4943077, 'ulta'],
  ['<p><strong>Ulta - Avondale # 1132</strong></p><p>10050 W. McDowell Road Suite 110<br>Avondale, AZ 85323</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10050+W+McDowell+Road+Suite+110+Avondale+AZ+85323\' target=\'_blank\'>Get Directions</a></p>', 33.467435, -112.27634, 'ulta'],
  ['<p><strong>Ulta - Cookeville # 1199</strong></p><p>1265 Interstate Drive Suite 119<br>Cookeville, TN 38501</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1265+Interstate+Drive+Suite+119+Cookeville+TN+38501\' target=\'_blank\'>Get Directions</a></p>', 36.1386289, -85.5083517, 'ulta'],
  ['<p><strong>Ulta - Riverhead # 1241</strong></p><p>1738 Old Country Road <br>Riverhead, NY 11901</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1738+Old+Country+Road++Riverhead+NY+11901\' target=\'_blank\'>Get Directions</a></p>', 40.9244751, -72.7021552, 'ulta'],
  ['<p><strong>Ulta - Benton # 1260</strong></p><p>20420 I-30 North<br>Benton, AR 72019</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=20420+I-30+North+Benton+AR+72019\' target=\'_blank\'>Get Directions</a></p>', 34.6061924, -92.5408801, 'ulta'],
  ['<p><strong>Ulta - Lexington # 1263</strong></p><p>5336 Sunset Blvd Suite B<br>Lexington, SC 29072</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5336+Sunset+Blvd+Suite+B+Lexington+SC+29072\' target=\'_blank\'>Get Directions</a></p>', 34.003851, -81.2094091, 'ulta'],
  ['<p><strong>Ulta - Santa Rosa # 1290</strong></p><p>361 Coddingtown Center<br>Santa Rosa, CA 95401</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=361+Coddingtown+Center+Santa+Rosa+CA+95401\' target=\'_blank\'>Get Directions</a></p>', 38.4565931, -122.7270769, 'ulta'],
  ['<p><strong>Ulta - Greenfield # 1291</strong></p><p>8500 West Sura Lane<br>Greenfield, WI 53228</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8500+West+Sura+Lane+Greenfield+WI+53228\' target=\'_blank\'>Get Directions</a></p>', 42.9611798, -88.0195693, 'ulta'],
  ['<p><strong>Ulta - Pooler # 1324</strong></p><p>201 Tanger Outlet Blvd<br>Pooler, GA 31322</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=201+Tanger+Outlet+Blvd+Pooler+GA+31322\' target=\'_blank\'>Get Directions</a></p>', 32.1364567, -81.2482694, 'ulta'],
  ['<p><strong>Ulta - Daytona Beach # 1325</strong></p><p>1115 Conerstone Blvd Suite K<br>Daytona Beach, FL 32114</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1115+Conerstone+Blvd+Suite+K+Daytona+Beach+FL+32114\' target=\'_blank\'>Get Directions</a></p>', 29.2142671, -81.0945221, 'ulta'],
  ['<p><strong>Ulta - Prosper # 1330</strong></p><p>1031 S. Preston Rd.<br>Prosper, TX 75078</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1031+S+Preston+Rd+Prosper+TX+75078\' target=\'_blank\'>Get Directions</a></p>', 33.2359851, -96.7898443, 'ulta'],
  ['<p><strong>Ulta - Wenatchee # 1346</strong></p><p>1370 N. Miller<br>Wenatchee, WA 98801</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1370+N+Miller+Wenatchee+WA+98801\' target=\'_blank\'>Get Directions</a></p>', 47.4405345, -120.3273904, 'ulta'],
  ['<p><strong>Ulta - Pinecrest # 1348</strong></p><p>11751 S. Dixie Highway<br>Pinecrest, FL 33156</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11751+S+Dixie+Highway+Pinecrest+FL+33156\' target=\'_blank\'>Get Directions</a></p>', 25.6614325, -80.3250099, 'ulta'],
  ['<p><strong>Ulta - Rialto # 1353</strong></p><p>1215 W. Renaissance Parkway Suite 650<br>Rialto, CA 92376</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1215+W+Renaissance+Parkway+Suite+650+Rialto+CA+92376\' target=\'_blank\'>Get Directions</a></p>', 34.1328161, -117.396716, 'ulta'],
  ['<p><strong>Ulta - Pembroke Pines # 1373</strong></p><p>15855 Pines Blvd. Suite #104<br>Pembroke Pines, FL 33027</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=15855+Pines+Blvd+Suite+#104+Pembroke+Pines+FL+33027\' target=\'_blank\'>Get Directions</a></p>', 26.0089695, -80.3574181, 'ulta'],
  ['<p><strong>Ulta - McAllen # 1374</strong></p><p>2700 West Expressway 83<br>McAllen, TX 78501</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2700+West+Expressway+83+McAllen+TX+78501\' target=\'_blank\'>Get Directions</a></p>', 26.1955411, -98.2535172, 'ulta'],
  ['<p><strong>Ulta - St. Louis # 1375</strong></p><p>4120 Elm Park Drive<br>St. Louis, MO 63128</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4120+Elm+Park+Drive+St+Louis+MO+63128\' target=\'_blank\'>Get Directions</a></p>', 38.5111928, -90.3389334, 'ulta'],
  ['<p><strong>Ulta - Lake Jackson # 1380</strong></p><p>100 Highway 332 W. Suite 1102<br>Lake Jackson, TX 77566</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=100+Highway+332+W+Suite+1102+Lake+Jackson+TX+77566\' target=\'_blank\'>Get Directions</a></p>', 29.0505724, -95.4590947, 'ulta'],
  ['<p><strong>Ulta - Brooklyn # 1381</strong></p><p>5100 Kings Plaza Suite 140<br>Brooklyn, NY 11234</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5100+Kings+Plaza+Suite+140+Brooklyn+NY+11234\' target=\'_blank\'>Get Directions</a></p>', 40.6104636, -73.9208806, 'ulta'],
  ['<p><strong>Ulta - Hunstville # 1391</strong></p><p>935 Bob Wallace Avenue SW Suite #109<br>Huntsville, AL 35801</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=935+Bob+Wallace+Avenue+SW+Suite+#109+Huntsville+AL+35801\' target=\'_blank\'>Get Directions</a></p>', 34.7105585, -86.5896701, 'ulta'],
  ['<p><strong>Ulta - Rochester # 1393</strong></p><p>2238 3rd Ave. SE<br>Rochester, MN 55904</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2238+3rd+Ave+SE+Rochester+MN+55904\' target=\'_blank\'>Get Directions</a></p>', 43.9881564, -92.4603434, 'ulta'],
  ['<p><strong>Ulta - Hoover # 1396</strong></p><p>1721 Montgomery Highway South<br>Hoover, AL 35244</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1721+Montgomery+Highway+South+Hoover+AL+35244\' target=\'_blank\'>Get Directions</a></p>', 33.3806761, -86.8033682, 'ulta'],
  ['<p><strong>Ulta - Woodland # 1397</strong></p><p>2135 Bronze Star Drive<br>Woodland, CA 95776</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2135+Bronze+Star+Drive+Woodland+CA+95776\' target=\'_blank\'>Get Directions</a></p>', 38.67193, -121.7272661, 'ulta'],
  ['<p><strong>Ulta - Arlington # 1398</strong></p><p>1101 South Joyce Street Suite B01<br>Arlington, VA 22202</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1101+South+Joyce+Street+Suite+B01+Arlington+VA+22202\' target=\'_blank\'>Get Directions</a></p>', 38.8648348, -77.0625666, 'ulta'],
  ['<p><strong>Ulta - Hamilton Township # 1400</strong></p><p>540 Spirit of 76 Boulevard<br>Hamilton Township, NJ 08691</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=540+Spirit+of+76+Boulevard+Hamilton+Township+NJ+08691\' target=\'_blank\'>Get Directions</a></p>', 40.195899, -74.6376186, 'ulta'],
  ['<p><strong>Ulta - Portland # 1404</strong></p><p>10245 NE Cascade Parkway<br>Portland, OR 97220</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10245+NE+Cascade+Parkway+Portland+OR+97220\' target=\'_blank\'>Get Directions</a></p>', 45.573925, -122.5566425, 'ulta'],
  ['<p><strong>Ulta - Louisville # 1408</strong></p><p>5000 Shelbyville Road Suite D155<br>Louisville, KY 40207</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5000+Shelbyville+Road+Suite+D155+Louisville+KY+40207\' target=\'_blank\'>Get Directions</a></p>', 38.2467204, -85.6232509, 'ulta'],
  ['<p><strong>Ulta - Bloomington # 1409</strong></p><p>215 East Broadway<br>Bloomington, MN 55425</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=215+East+Broadway+Bloomington+MN+55425\' target=\'_blank\'>Get Directions</a></p>', 44.8549431, -93.2398785, 'ulta'],
  ['<p><strong>Ulta - Santa Maria # 1411</strong></p><p>755 E. Betteravia Road<br>Santa Maria, CA 93458</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=755+E+Betteravia+Road+Santa+Maria+CA+93458\' target=\'_blank\'>Get Directions</a></p>', 34.9251084, -120.4235031, 'ulta'],
  ['<p><strong>Ulta - Kemah # 1412</strong></p><p>417 FM 518<br>Kemah, TX 77565</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=417+FM+518+Kemah+TX+77565\' target=\'_blank\'>Get Directions</a></p>', 29.5340416, -95.0203183, 'ulta'],
  ['<p><strong>Ulta - Salem # 1413</strong></p><p>831 Landcaster Drive NE Suite #181<br>Salem, OR 97301</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=831+Landcaster+Drive+NE+Suite+#181+Salem+OR+97301\' target=\'_blank\'>Get Directions</a></p>', 44.9415479, -122.9867232, 'ulta'],
  ['<p><strong>Ulta - New Caney # 1422</strong></p><p>21524 Market Place Dr<br>New Caney, TX 77357</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=21524+Market+Place+Dr+New+Caney+TX+77357\' target=\'_blank\'>Get Directions</a></p>', 30.1343506, -95.2305205, 'ulta'],
  ['<p><strong>Ulta - Wall Township # 1430</strong></p><p>1933 Route 35 South<br>Wall Township, NJ 07719</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1933+Route+35+South+Wall+Township+NJ+07719\' target=\'_blank\'>Get Directions</a></p>', 40.1549477, -74.0560645, 'ulta'],
  ['<p><strong>Ulta - Staten Island #1432</strong></p><p>2655 Richmond Avenue Space 1405<br>Staten Island, NY 10314</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=2655+Richmond+Avenue+Space+1405+Staten+Island+NY+10314\' target=\'_blank\'>Get Directions</a></p>', 40.5811995, -74.1647664, 'ulta'],
  ['<p><strong>Ulta - Morgan Hill # 1434</strong></p><p>1027 Cochrane Road<br>Morgan Hill, CA 95307</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1027+Cochrane+Road+Morgan+Hill+CA+95307\' target=\'_blank\'>Get Directions</a></p>', 37.1556394, -121.6531702, 'ulta'],
  ['<p><strong>Ulta - Charleston # 1435</strong></p><p>1812 Sam Rittenberg Blvd Unit #10<br>Charleston, SC 29407</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1812+Sam+Rittenberg+Blvd+Unit+#10+Charleston+SC+29407\' target=\'_blank\'>Get Directions</a></p>', 32.8017826, -80.0192525, 'ulta'],
  ['<p><strong>Ulta - Owasso # 1438</strong></p><p>9018 N 121st E. Ave. Suite 500<br>Owasso, OK 74005</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=9018+N+121st+E+Ave+Suite+500+Owasso+OK+74005\' target=\'_blank\'>Get Directions</a></p>', 36.2907445, -95.8430337, 'ulta'],
  ['<p><strong>Ulta - Baton Rouge # 1439</strong></p><p>7445 Corporate Blvd Suite 500<br>Baton Rouge, LA 70809</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=7445+Corporate+Blvd+Suite+500+Baton+Rouge+LA+70809\' target=\'_blank\'>Get Directions</a></p>', 30.4332432, -91.1139917, 'ulta'],
  ['<p><strong>Ulta - Lacey # 1441</strong></p><p>1230 Marvin Road<br>Lacey, WA 98516</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1230+Marvin+Road+Lacey+WA+98516\' target=\'_blank\'>Get Directions</a></p>', 47.058019, -122.761446, 'ulta'],
  ['<p><strong>Ulta - Topeka #1443</strong></p><p>1740 SW Wanamaker Road Suite 300<br>Topeka, KS 66604</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1740+SW+Wanamaker+Road+Suite+300+Topeka+KS+66604\' target=\'_blank\'>Get Directions</a></p>', 39.0349164, -95.7586197, 'ulta'],
  ['<p><strong>Ulta - Pico Rivera # 1446</strong></p><p>8620 Washington Blvd. <br>Pico Rivera, CA 90660</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8620+Washington+Blvd++Pico+Rivera+CA+90660\' target=\'_blank\'>Get Directions</a></p>', 33.9855454, -118.1023007, 'ulta'],
  ['<p><strong>Ulta - Dalton # 1449</strong></p><p>1310 W Walnut Ave Suite 1<br>Dalton, GA 30720</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1310+W+Walnut+Ave+Suite+1+Dalton+GA+30720\' target=\'_blank\'>Get Directions</a></p>', 34.7607795, -84.9933786, 'ulta'],
  ['<p><strong>Ulta - Kahului # 1453</strong></p><p>66 Ho\'okele Street Unit 1110<br>Kahului, HI 96732</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=66+Ho\'okele+Street+Unit+1110+Kahului+HI+96732\' target=\'_blank\'>Get Directions</a></p>', 20.8736506, -156.4563379, 'ulta'],
  ['<p><strong>Ulta - Pearl City # 1454</strong></p><p>1000 Kamehameha Highway Suite 224<br>Pearl City, HI 96782</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1000+Kamehameha+Highway+Suite+224+Pearl+City+HI+96782\' target=\'_blank\'>Get Directions</a></p>', 21.3966024, -157.9771902, 'ulta'],
  ['<p><strong>Ulta - Fort Walton Beach # 1458</strong></p><p>99 Eglin Parkway Suite 1B<br>Fort Walton Beach, FL 32548</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=99+Eglin+Parkway+Suite+1B+Fort+Walton+Beach+FL+32548\' target=\'_blank\'>Get Directions</a></p>', 30.4184331, -86.6069836, 'ulta'],
  ['<p><strong>Ulta - The Woodlands # 1473</strong></p><p>1900 Lake Woodlands Drive Suite 800<br>The Woodlands, TX 77380</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1900+Lake+Woodlands+Drive+Suite+800+The+Woodlands+TX+77380\' target=\'_blank\'>Get Directions</a></p>', 30.1658128, -95.4632202, 'ulta'],
  ['<p><strong>Ulta - San Diego # 1475</strong></p><p>11485 Carmel Mountain Road<br>San Diego, CA 92128</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=11485+Carmel+Mountain+Road+San+Diego+CA+92128\' target=\'_blank\'>Get Directions</a></p>', 32.9778353, -117.0837214, 'ulta'],
  ['<p><strong>Ulta - San Diego # 1476</strong></p><p>10653 Westview Parkway<br>San Diego, CA 92126</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=10653+Westview+Parkway+San+Diego+CA+92126\' target=\'_blank\'>Get Directions</a></p>', 32.9146424, -117.1196625, 'ulta'],
  ['<p><strong>Ulta - Jacksonville</strong></p><p>4397 Roosevelt Blvd.<br>Jacksonville, FL 32210</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4397+Roosevelt+Blvd+Jacksonville+FL+32210\' target=\'_blank\'>Get Directions</a></p>', 30.2819041, -81.7184087, 'ulta'],
  ['<p><strong>Ulta - Winter Springs # 1482</strong></p><p>1425 Tuskawilla Road Suite 239<br>Winter Springs, FL 32708</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=1425+Tuskawilla+Road+Suite+239+Winter+Springs+FL+32708\' target=\'_blank\'>Get Directions</a></p>', 28.6465383, -81.2648127, 'ulta'],
  ['<p><strong>Ulta - Denver # 1484</strong></p><p>8560 E Northfield Blvd. Unit 1930<br>Denver, CO 80238</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8560+E+Northfield+Blvd+Unit+1930+Denver+CO+80238\' target=\'_blank\'>Get Directions</a></p>', 39.785446, -104.8886527, 'ulta'],
  ['<p><strong>Ulta - Williston # 1486</strong></p><p>41 Hawthorne Street<br>Williston, VT 05495</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=41+Hawthorne+Street+Williston+VT+05495\' target=\'_blank\'>Get Directions</a></p>', 44.446005, -73.110237, 'ulta'],
  ['<p><strong>Ulta - League City # 1490</strong></p><p>3120 Gulf Freeway South Suite A<br>League City, TX 77573</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=3120+Gulf+Freeway+South+Suite+A+League+City+TX+77573\' target=\'_blank\'>Get Directions</a></p>', 29.4663781, -95.0867943, 'ulta'],
  ['<p><strong>Ulta - Evans # 1495</strong></p><p>4217 Washington Road Suite 2<br>Evans, GA 30809</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4217+Washington+Road+Suite+2+Evans+GA+30809\' target=\'_blank\'>Get Directions</a></p>', 33.5256197, -82.1196965, 'ulta'],
  ['<p><strong>Ulta - Lake Stevens #1508</strong></p><p>519 State Route 9 NE<br>Lake Stevens, WA 98258</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=519+State+Route+9+NE+Lake+Stevens+WA+98258\' target=\'_blank\'>Get Directions</a></p>', 48.0014725, -122.1036723, 'ulta'],
  ['<p><strong>Ulta - Trumbull # 1510</strong></p><p>5065 Main Street Space 306<br>Trumbull, CT 06611</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=5065+Main+Street+Space+306+Trumbull+CT+06611\' target=\'_blank\'>Get Directions</a></p>', 41.2293413, -73.2267736, 'ulta'],
  ['<p><strong>Ulta - Spokane Valley # 1521</strong></p><p>13810 E Indiana Avenue<br>Spokane Valley, WA 99216</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=13810+E+Indiana+Avenue+Spokane+Valley+WA+99216\' target=\'_blank\'>Get Directions</a></p>', 47.6750354, -117.2169889, 'ulta'],
  ['<p><strong>Ulta - Conroe #1528</strong></p><p>255 S Loop 336 W<br>Conroe, TX 77304</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=255+S+Loop+336+W+Conroe+TX+77304\' target=\'_blank\'>Get Directions</a></p>', 30.2794758, -95.4637188, 'ulta'],
  ['<p><strong>Ulta - Concord # 1531</strong></p><p>8052 Concord Mills Blvd<br>Concord, NC 28027</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8052+Concord+Mills+Blvd+Concord+NC+28027\' target=\'_blank\'>Get Directions</a></p>', 35.3714733, -80.7184906, 'ulta'],
  ['<p><strong>Ulta - Gonzalez (Crestview Plaza) #15</strong></p><p>115 S. Airline Highway Suite C<br>Gonzales, LA 70737</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=115+S+Airline+Highway+Suite+C+Gonzales+LA+70737\' target=\'_blank\'>Get Directions</a></p>', 30.2318728, -90.9101678, 'ulta'],
  ['<p><strong>Ulta - Pasadena #1582</strong></p><p>8070 Ritchie Highway Suite 6A<br>Pasadena, MD 21122</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=8070+Ritchie+Highway+Suite+6A+Pasadena+MD+21122\' target=\'_blank\'>Get Directions</a></p>', 39.1261803, -76.5906542, 'ulta'],
  ['<p><strong>Ulta - Williamsville #1602</strong></p><p>4927 5089 Transit Road<br>Williamsville, NY 14221</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=4927+5089+Transit+Road+Williamsville+NY+14221\' target=\'_blank\'>Get Directions</a></p>', 42.9855018, -78.6969369, 'ulta'],
  ['<p><strong>Ulta - Columbus # 1606  OH (Graceland)</strong></p><p>135 Graceland Blvd<br>Columbus, OH 43214</p><p><a href=\'https://maps.google.com/maps?f=d&daddr=135+Graceland+Blvd+Columbus+OH+43214\' target=\'_blank\'>Get Directions</a></p>', 40.0649995, -83.0229201, 'ulta']
];

function initialize() {

  var myOptions = {
    center: {
      lat: 38.952353,
      lng: -94.7184947
    },
    zoom: 4,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['']
    }

  };
  var map = new google.maps.Map(document.getElementById("store-map"), myOptions);

  setMarkers(map, locations);

  // set default user location
  $.get('https://api.smartip.io/?api_key=2b68f93b-41f3-40c4-80d0-42a6c6772a05', function(response) {
    var userZip = response.location['zip-code'];
    $.ajax({
      type: "POST",
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userZip + '&key=AIzaSyBD-5YCaidtrocHIYU5qpcliaUkp6RQgsU',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        if (data.status != 'ZERO_RESULTS') {
          map.panTo({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
          });
          map.setZoom(10);
        } else {
          alert('Please enter a valid addres or zip')
        }
      }
    });    
    $('#zip_bar input').val(userZip);
  }, 'json');


  $('#zip_bar button').on('click', function() {
    var userZip = $('#zip_bar input').val();
    $.ajax({
      type: "POST",
      url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userZip + '&key=AIzaSyBD-5YCaidtrocHIYU5qpcliaUkp6RQgsU',
      dataType: 'json',
      success: function(data) {
        console.log(data);
        if (data.status != 'ZERO_RESULTS') {
          map.panTo({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng
          });
          map.setZoom(10);
        } else {
          alert('Please enter a valid addres or zip')
        }
      }
    });
  });

}


function setMarkers(map, locations) {

  var marker, i

  var infoWindows = [];

  for (i = 0; i < locations.length; i++) {

    var store_info = locations[i][0]
    var lat = locations[i][1]
    var long = locations[i][2]
    var icon = locations[i][3]

    latlngset = new google.maps.LatLng(lat, long);

    if (icon == 'nordstrom') {
      var location_icon = 'https://cdn.shopify.com/s/files/1/0032/3423/4479/files/nordstrom_icon_351c21f9-40a0-4d2e-ba3c-35cb3ccf7033.png?13322'
      var scaled_size = new google.maps.Size(23, 30);
    } else {
      var location_icon = 'https://cdn.shopify.com/s/files/1/0032/3423/4479/files/ulta_icon4.png?52603'
      var scaled_size = new google.maps.Size(25, 25);
    }

    var marker = new google.maps.Marker({
      map: map,
      title: store_info,
      position: latlngset,
      icon: {
        url: location_icon,
        scaledSize: scaled_size
      }
    });

    var content = store_info;
    var infowindow = new google.maps.InfoWindow();

    infoWindows.push(infowindow);

    function closeAllInfoWindows() {
      for (var i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
      }
    }

    google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
      return function() {
        closeAllInfoWindows();
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

  }
}


$(function() {
  $('#zip_bar input').keypress(function(e) {
    if (e.which == 13) {
      jQuery(this).blur();
      jQuery('#zip_bar button').focus().click();
    }
  });

  // load the map
  initialize();
});
