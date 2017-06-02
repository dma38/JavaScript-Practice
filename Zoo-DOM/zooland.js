/*
    Script name: Zooland.js
    Description: Used to display animals and related info from an XML file
    Author: Shu Liu
    Date Created:Apr 10 2016
*/
function searchAnimal()
{
  showAllAnimals();
  var animals = document.getElementsByTagName("li");
  var searchText = document.getElementById("search_text").value;
  var commonName = document.getElementsByTagName("h3");
  var scientificName = document.getElementsByTagName("h4");

  document.getElementsByTagName("li")[0].style.display = "none";

  for (var i = 1; i < animals.length; i++) 
  {
      if (commonName[i-1].firstChild.nodeValue.toUpperCase() != searchText.toUpperCase()
        &&scientificName[i-1].firstChild.nodeValue.toUpperCase() != searchText.toUpperCase()) 
      {
         document.getElementsByTagName("li")[i].style.display = "none";
      }
  }

  var animalsFound = 0;
  for (var i = 1; i < animals.length; i++) 
  {
    if (animals[i].style.display != "none") 
    {
      animalsFound ++;
    }
  }

  if (animalsFound == 0)
  {
    document.getElementsByTagName("li")[0].firstChild.nodeValue = searchText + " Not Found";
    document.getElementsByTagName("li")[0].style.display = "block";

      if(search.trim() == "")
      {
          showAllAnimals();
      }
  }

}

function showAllAnimals()
{
  var animals = document.getElementsByTagName("li");
  for (var i = 0; i < animals.length; i++) 
  {

      animals[i].style.display = "block"

  }

  document.getElementsByTagName("li")[0].style.display = "none";
}

function load() 
{

  // Code that you want executed once the DOM has loaded goes here.
  var zooland_xml = loadXML("zooland.xml");

  // Let's do a bit of sanity checking:
  var zoolandRoot = zooland_xml.documentElement;

  // Ensure that the xml has loaded correctly.
  console.log(xmlToString(zooland_xml));

  var section = document.getElementsByTagName("section")[0];
  var ul = document.getElementsByTagName("ul")[0];

  // Find the name of the first animal and write it to the console.
  for (var i = 0; i < zoolandRoot.getElementsByTagName("animal").length; i++) 
  {

    var newLi = document.createElement("li");
    var newH3 = document.createElement("h3");
    var newH4 = document.createElement("h4");
    var newBlockquote = document.createElement("blockquote");
    var newDiv = document.createElement("div");

    var animal = zoolandRoot.getElementsByTagName("animal")[i];

    var common_name_element = animal.getElementsByTagName("common_name")[0];
    var common_name = common_name_element.firstChild.nodeValue;
    newH3.appendChild(document.createTextNode(common_name));

    var scientific_name_element = animal.getElementsByTagName("scientific_name")[0];
    var scientific_name = scientific_name_element.firstChild.nodeValue;
    newH4.appendChild(document.createTextNode(scientific_name));

    var description_element = animal.getElementsByTagName("description")[0];
    var description = description_element.firstChild.nodeValue;
    newBlockquote.appendChild(document.createTextNode(description));

    for (var j = 0; j < animal.getElementsByTagName("image").length; j++) 
    {
      
      var imgTag = document.createElement("img");
      var img_element = animal.getElementsByTagName("image")[j];
      var img = img_element.firstChild.nodeValue;
      var imgContent = "images/"+ img;
      imgTag.src = imgContent;
      newDiv.appendChild(imgTag);
    }

    newLi.appendChild(newH3);
    newLi.appendChild(newH4);
    newLi.appendChild(newBlockquote);
    newLi.appendChild(newDiv);
    ul.appendChild(newLi);

  }

  if (zoolandRoot.getElementsByTagName("animal").length>0) 
  {

    document.getElementsByTagName("li")[0].style.display = "none";

  }

  for(var i =0; i< document.getElementsByTagName("li").length; i++)
  {
     if(i%2!=0)
     {
          document.getElementsByTagName("li")[i].
          setAttribute("class", "zebra_background");
     }

  }

  document.getElementById("search_button").addEventListener("click", searchAnimal, false);
  document.getElementById("show_all_button").addEventListener("click", showAllAnimals, false);
}

// Other event listeners can go here.
document.addEventListener("DOMContentLoaded", load);