var fs=require('fs');
var fullContent="";
fs.createReadStream("../Source_file/FoodFacts.csv")
	.on("data",function(ch){
		fullContent+=ch;
	})
	.on("end",function(data){
var noOfLines=fullContent.split('\n');	//no. of lines in csv readed content
		var headings=noOfLines[0].split(",");
		var countryIndex = headings.indexOf("countries_en");
		var saltIndex = headings.indexOf("salt_100g");
		var sugarIndex = headings.indexOf("sugars_100g");
		var protienIndex = headings.indexOf("proteins_100g");
		var carboIndex = headings.indexOf("carbohydrates_100g");
		var fatIndex = headings.indexOf("fat_100g");
		var givencountry = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
		var northEurope = ['United Kingdom', 'Denmark', 'Sweden','Norway'];
		var centralEurope  = ['France', 'Belgium', 'Germany', 'Switzerland','Netherlands'];
		var southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'];
		var saltConsumption=new Uint8Array(9);
		var sugarConsumption=new Uint8Array(9);
		var i=1;
		var fatNorthEurope=0;
		var fatCentralEurope=0;
		var fatSouthEurope=0;
		var proteinNorthEurope=0;
		var proteinCentralEurope=0;
		var proteinSouthEurope=0;
		var carboNorthEurope=0;
		var carboCentralEurope=0;
		var carboSouthEurope=0;

		noOfLines.forEach(function(d)
		{
			var line=d.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
			var countryCheckforPart1=givencountry.includes(line[countryIndex]);
			var countryCheckforNorthEurope=northEurope.includes(line[countryIndex]);
			var countryCheckforCentralEurope=centralEurope.includes(line[countryIndex]);
			var countryCheckforSouthEurope=southEurope.includes(line[countryIndex]);
			i++;
			if(countryCheckforPart1)
			{
				var salt = line[saltIndex];
				var sugar=line[sugarIndex];
				if(salt=="")
					salt=0;
				if(sugar=="")
					sugar=0;
				var currentCountryIndex=givencountry.indexOf(line[countryIndex]);
				saltConsumption[currentCountryIndex]+=parseFloat(salt);
				sugarConsumption[currentCountryIndex]+=parseFloat(sugar);
				countryCheckforPart1=false;
			}
			if(countryCheckforNorthEurope||countryCheckforCentralEurope||countryCheckforSouthEurope)
			{
				var fat=line[fatIndex];
				var protein=line[protienIndex];
				var carbo=line[carboIndex];
				if(fat=="")
					fat=0;
				if(protein=="")
					protein=0;
				if(carbo=="")
					carbo=0;
			if(countryCheckforNorthEurope)
			{

				fatNorthEurope+=parseFloat(fat);
				proteinNorthEurope+=fat=parseFloat(protein);
				carboNorthEurope+=parseFloat(carbo);
				countryCheckforNorthEurope=false;

			}
			if(countryCheckforCentralEurope)
			{
				fatCentralEurope+=parseFloat(fat);
				proteinCentralEurope+=parseFloat(protein);
				carboCentralEurope+=parseFloat(carbo);
				countryCheckforCentralEurope=false;

			}
			if(countryCheckforSouthEurope)
			{
				fatSouthEurope+=parseFloat(fat);
				proteinSouthEurope+=parseFloat(protein);
				carboSouthEurope+=parseFloat(carbo);
				countryCheckforSouthEurope=false;

			}
		}

		});
		i=0;
		var jsonArray1=[];
		var jsonArray2=[];

		givencountry.forEach(function(d)
		{
			var objPart1={};
			objPart1["country"]=givencountry[i];
			objPart1["salt"]=saltConsumption[i];
			objPart1["sugar"]=sugarConsumption[i];
			jsonArray1.push(objPart1);
			i++;
		});
		
		var objNorth={};
		objNorth["countryName"]="North Europe";
		objNorth["FatConsumption"]=fatNorthEurope;
		objNorth["ProteinConsumption"]=proteinNorthEurope;
		objNorth["CarbohydrateConsumption"]=carboNorthEurope;
		jsonArray2.push(objNorth);

		var objCentral={};
		objCentral["countryName"]="Central Europe";
		objCentral["FatConsumption"]=fatCentralEurope;
		objCentral["ProteinConsumption"]=proteinCentralEurope;
		objCentral["CarbohydrateConsumption"]=carboCentralEurope;
		jsonArray2.push(objCentral);

		var objSouth={};
		objSouth["countryName"]="South Europe";
		objSouth["FatConsumption"]=fatSouthEurope;
		objSouth["ProteinConsumption"]=proteinSouthEurope;
		objSouth["CarbohydrateConsumption"]=carboSouthEurope;
		jsonArray2.push(objSouth);

		fs.writeFile("../output_json/parse1.json",JSON.stringify(jsonArray1),'utf-8');

		fs.writeFile("../output_json/parse2.json",JSON.stringify(jsonArray2),'utf-8');

});	