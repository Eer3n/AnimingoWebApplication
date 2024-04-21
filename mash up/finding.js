fetch('user.json')
.then(function(response){
    return response.json();
})
.then(function(json){
    let products = json;
    initialize(products);
})
.catch(function(err){
    console.log('Fetch problem:' + err.message);
})


function initialize(products) {
    const petType = document.querySelector('#petType');
    const userSearchBreed = document.querySelector('#petBreed');
    const userSearchPetGender = document.querySelector('#petGender');
    const userSearchOwnerGender = document.querySelector('#ownerGender');
    const distance = document.querySelector('#distance');
    const petMinimumAge = document.querySelector('#minimumAge');
    const petMaximumAge = document.querySelector('#maximumAge');
    // alert(distance.value)

    const searchButton = document.querySelector('button');
    const main = document.querySelector('main');
  
    let lastPetType = petType.value;
    let lastSearch = '';
    let lastPetGenderSearch = userSearchPetGender.value;
    let lastOwnerGenderSearch = userSearchOwnerGender.value;
    let lastDistance = 50;
    let lastMinimumAge = 1;
    let lastMaximumAge = 50;

  
    let petTypelist;
    let petBreedlist;
    let petGenderlist; 
    let ownerGenderlist;
    let distancelist;
    let minimumAgelist;
    let maximumAgelist;

    let finallist;
  
    finallist = products;
    refreshDisplay();
  
    petTypelist = [];
    petBreedlist = [];
    petGenderlist = [];
    ownerGenderlist = [];
    distancelist = [];
    minimumAgelist = [];
    maximumAgelist = [];
    
    finallist = [];
  
    searchButton.addEventListener('click', selectPetType);
  


    function selectPetType(arg) {
        arg.preventDefault();
    
        petTypelist = [];
        petBreedlist = [];
        petGenderlist = [];
        ownerGenderlist = [];
        distancelist = [];
        minimumAgelist = [];
        maximumAgelist = [];

        finallist = [];

        if (petType.value === lastPetType && userSearchBreed.value.trim() === lastSearch && userSearchPetGender.value === lastPetGenderSearch && userSearchOwnerGender.value === lastOwnerGenderSearch && distance.value === lastDistance && petMinimumAge.value === lastMinimumAge && petMaximumAge === lastMaximumAge) {
            return;
        } else {
            lastPetType = petType.value;
            lastSearch = userSearchBreed.value.trim();
            lastPetGenderSearch = userSearchPetGender.value;
            lastOwnerGenderSearch = userSearchOwnerGender.value;
            lastDistance = distance.value;
            lastMinimumAge = petMinimumAge.value;
            lastMaximumAge = petMaximumAge.value;

            if (petType.value === 'All') {
                petTypelist = products;
                selectBreed();
            
            } else {
                // const lowerCaseType = petType.value.toLowerCase();
                // petTypelist = products.filter( product => product.petType === lowerCaseType );
                // selectBreed();

            
                petTypelist = products.filter( product => product.petType === petType.value);
                selectBreed();
                }
        }
    }
    
        



    function selectBreed() {
        
        if (userSearchBreed.value.trim() === '') {
            petBreedlist = petTypelist;
            // finallist = petBreedlist
            selectGender();
        } else {
            petBreedlist = petTypelist.filter( product => product.petBreed.includes(userSearchBreed.value));
            // finallist = petBreedlist
            selectGender();
        }
        
        // refreshDisplay();
    }

    function selectGender() {
        
        if (userSearchPetGender.value === 'All') {
            petGenderlist = petBreedlist;
            // finallist = petGenderlist;
            selectOwnerGender();
        } else {
            petGenderlist = petBreedlist.filter( product => product.petGender.includes(userSearchPetGender.value));
            // finallist = petGenderlist;
            selectOwnerGender();
        }
        
        // refreshDisplay();
    }

    function selectOwnerGender() {
        
        if (userSearchOwnerGender.value === 'All') {
            ownerGenderlist = petGenderlist;
            //finallist = ownerGenderlist;
            selectDistance();
        } else {
            ownerGenderlist = petGenderlist.filter( product => product.ownerGender.includes(userSearchOwnerGender.value));
            // finallist = ownerGenderlist;
            selectDistance();
        }
        
        //refreshDisplay();
    }

    function selectDistance() {
        
        if (distance.value === 100) {
            distancelist = ownerGenderlist;
            //finallist = distancelist;
            selectMinimumAge();
        } else {
            distancelist = ownerGenderlist.filter( product => product.Distance <= distance.value);
            //finallist = distancelist;
            selectMinimumAge();
        }
        
        //refreshDisplay();
    }

    function selectMinimumAge() {
        
        if (petMinimumAge.value === 0) {
            minimumAgelist = distancelist;
            //finallist = minimumAgelist;
            selectMaximumAge();
        } else {
            minimumAgelist = distancelist.filter( product => product.petAge >= petMinimumAge.value);
            //finallist = minimumAgelist;
            selectMaximumAge();
        }
        
        //refreshDisplay();
    }
    
    function selectMaximumAge() {
        
        if (petMinimumAge.value === 0) {
            maximumAgelist = minimumAgelist;
            finallist = maximumAgelist;
        } else {
            maximumAgelist = minimumAgelist.filter( product => product.petAge <= petMaximumAge.value);
            finallist = maximumAgelist;
        }
        
        refreshDisplay();
    }
    
        
    function refreshDisplay() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
            
        }

        if (finallist.length === 0) {
            const para = document.createElement('p');
            para.textContent = "What you are looking for doesn't exist on this app ;(";
            main.appendChild(para);
        } else {
            for (const product of finallist) {
            fetchBlob(product);
            }
        }
    }
    
    
    function fetchBlob(product) {
        const url = `images/${product.image}`;
        fetch(url)
            .then( response => {
            //   if (!response.ok) {
            //     throw new Error(`HTTP error: ${response.status}`);
            //   }
            return response.blob();
            })
            .then( blob => showProduct(blob, product) )
            .catch( err => console.error(`Fetch problem: ${err.message}`) );
        }
  

    function showProduct(blob, product) {
        const objectURL = URL.createObjectURL(blob);
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const paragraph = document.createElement('p');
        const divbox = document.createElement('div');
        const image = document.createElement('img');
    
        section.setAttribute('class', product.petName);
        heading.textContent = product.petName;
        paragraph.textContent = `${product.Distance}km`;
        divbox.textContent = `type: ${product.petType} `;
        //\n breed: ${product.petBreed} \n gender: ${product.petGender}`
    
        image.src = objectURL;
        image.alt = product.petName;
    
        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(paragraph);
        section.appendChild(image);
    }




  }








  function mouseOver(e)
  {
      if (e.target.tagName.toLowerCase() == "img")
      {
          e.target.setAttribute("style", "opacity: 0" );

      }
  }

  function mouseOut(e)
  {
      if (e.target.tagName.toLowerCase() == "img")
      {
          e.target.setAttribute("style", "opacity: 100" );

      }
  }

  document.addEventListener("click", mouseOver,false);
  document.addEventListener("mouseout", mouseOut,false);
