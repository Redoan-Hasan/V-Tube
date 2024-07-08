let categoryDetails = [];


const handleCategory = async () =>{
    const res = await fetch(" https://openapi.programming-hero.com/api/videos/categories")
    const data = await res.json();
    const category = data.data;
    // console.log(category);
    const navContainer = document.getElementById('header');
    const nav = document.createElement('nav');
    nav.innerHTML = `
    <nav>
        <div class=" max-w-screen-xl mx-auto mt-12">
            <div class=" flex justify-between items-center">
                <div> <img src="./Assets/Logo.png" alt=""> </div>
                <div> <button onClick = "handleSort()" class="px-5 py-2 rounded-lg text-black text-lg font-medium bg-[#25252533] hover:bg-red-500 ">Sort by view</button> </div>
                <div> <button class="px-5 py-2 rounded-lg text-black text-lg font-medium bg-red-500 "><a href = "blog.html" target ="_blank">Blogs</a></button></div>
            </div>
            <div class=" border-b-2 border-[#17171733] pt-8"></div>
        </div>
    </nav>
    `;
    navContainer.appendChild(nav);
    const categoryContainer = document.getElementById('categoryContainer');
    category.forEach((category) => {
        // console.log(category.category)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class ="flex justify-center items-center gap-">
        <button onClick = "handleCategoryId('${category.category_id}')" class="px-5 py-2 rounded-lg text-black text-lg font-medium bg-[#25252533] active:bg-red-500">${category.category}</button>
        </div>
        `;
        categoryContainer.appendChild(div);
        
    });
}

const handleCategoryId =async (categoryId ) =>{
    // const parseCategoryId = categoryId.toString();
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    categoryDetails = data.data;
    // console.log(categoryId);
    console.log(categoryDetails);
    const categoryCardContainer = document.getElementById('categoryCardDetails');
    categoryCardContainer.innerHTML = '';
    
    if(categoryDetails.length === 0){
        categoryCardContainer.classList.remove('grid');
        categoryCardContainer.innerHTML = `
        <div class=" mx-auto text-center flex flex-col justify-center items-center">
            <img class="" src="Assets/Icon.png" alt="">
            <h1 class ="text-4xl text-black font-bold">Oops!! Sorry, There is no content here</h1>
        </div>
        `;
    }else{
        categoryCardContainer.classList.add('grid');
        categoryDetails.forEach((category) =>{
            const div = document.createElement('div');
            let durationInSeconds = category.others.posted_date;
            let durationInMinutes = Math.floor(durationInSeconds / 60)
            let hours = Math.floor(durationInMinutes / 60)
            let minutes = hours % 60;
            // let overAllDuration = `${hours} hours ${minutes} minutes`
            // console.log(overAllDuration);
            div.innerHTML = `
            <div  class="card card-compact bg-white ">
                    <figure class="relative">
                            <img class="w-[312px] h-[200px]"  src="${category.thumbnail}" alt="Shoes" />
                            ${durationInSeconds.length != 0 ? 
                                `<p class="absolute bg-black bottom-2 right-2 text-white rounded-lg p-1">${hours+' '+'hours'+' '+minutes+' '+'minutes'}</p>` 
                                : ''}
                            
                    </figure>
                    <div class=" flex flex-row p-0 gap-3 py-5 text-left ">
                        <div>
                            <img class="w-10 h-10 rounded-[50%]" src="${category.authors[0]?.profile_picture}" alt="">
                        </div>
                        <div>
                            <h1 class="text-black text-base font-bold ">${category?.title}</h1>
                            <p class="text-[#171717B3] text-sm font-normal py-3">${category.authors[0]?.profile_name} ${
                                category.authors[0].verified?
                                '<i class="fa-solid fa-circle-check text-blue-600 pl-2"></i>'
                                :''
                            }</p>
                            <p class="text-[#171717B3] text-sm font-normal ">${category.others.views}</p>
                        </div>
                    </div>
            </div>
        `;
            categoryCardContainer.appendChild(div);
        })
    }
    }


handleCategory();

