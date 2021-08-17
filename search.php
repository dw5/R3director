<?php
$success=0;
$debugge=0;
/* not sure if this the best way to provide end result, I feel more efficient ways might exists, i'd like to know em :D */
/* also maybe even if something was as a single file, still could be made cleaner */
/* eventually maybe it could be a metasearch of some sort*/

$search_query = $_GET['q'];
$default_search = "https://searx.neocities.org/?q=";
//$quickjump // phrase to jump to specific link (e.g. code to open github, ytdl to open etc
$bangs = array(
"!ddg", "!yt", "!w", "!gt");
$redirto = array(
"https://duckduckgo.com/?q=", "https://www.youtube.com/results?search_query=", "https://duckduckgo.com/?q=!w ", "https://translate.google.com/#auto/en/test");

/* You might want to replace hard coded array and add database or external txt file as a per line reader */

$arrlength = count($bangs);
for($x = 0; $x < $arrlength; $x++) {

if (str_starts_with($search_query, $bangs[$x])) {
					   // remove what // replace with // full string
	$nicerquery = str_replace($bangs[$x]." ", "",$search_query);
	$redirectmeto = $redirto[$x];
	$success=1; // while you do loop check, don't override if the rigt one was found!
	
	if ($debugge==1){
	echo $nicerquery;
	echo "<br>";
	echo $redirectmeto;
	}

} else {
	if (!$success==1){
	$nicerquery=$search_query;
	$redirectmeto = $default_search;
	}
}
}

/* have this if statement if you want to catch bangs you uncausiosly use 
if (str_starts_with($search_query, "!")) {
	echo "You're using unintegrated bang! $search_query";
	break;
}*/

/* detect math and logical questions, get them to corrensponding page 
math example: 2+2
math example: 100-50%
coder example: "hello world" to hex
coder example: -1.27 to float hex
currency example: 1 EUR to USD
currency example: 1 EUR to SCAMCRYPTO
logical example: how many car seats
logical example: how many days in a year
other example: how to die (show prevention, motivational message)
other example: euro (show unicode)
other example: unicode infinity (show unicode and emoji)
other example: crying emoji (show unicode emoji)
*/
/*
if something do something todo
*/

if ($debugge==1){
echo "<HR>$revisiover<br>DBG:$debugge<hr>$success<br>";
echo $nicerquery;
echo "<br>";
echo $redirectmeto;
echo "<br>";
echo $redirectmeto.$nicerquery;
} else {
	$dotsbreakstuff=$redirectmeto.$nicerquery;
header("Location: $dotsbreakstuff");
}