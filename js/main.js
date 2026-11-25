
//------------------DARK-MODE-----------------//

const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")

const savedTheme = localStorage.getItem("theme")

if(savedTheme == "dark"){
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
}

function updateTheme(){
    if(themeToggle.checked == true){
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        themeIcon.textContent = "🌙";
    }
    else{
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        themeIcon.textContent = "☀️";
    }
}

updateTheme();
themeToggle.addEventListener("change", updateTheme)


//------------------DROP-DOWN-----------------//

const userButton = document.querySelector(".user-button");
const userDropdown = document.querySelector(".user-dropdown");

userButton.addEventListener("click", function() {

    userDropdown.classList.toggle("show");

});

document.addEventListener("click", function(event) {
    if(!userButton.contains(event.target)&&
       !userDropdown.contains(event.target)) {
        userDropdown.classList.remove("show");
       }
});


//-------------------LOAD-PAGE---------------------//

const mainContent = document.getElementById("main-content");

async function loadPage(pageName) {

    try {
        const response = await fetch(`pages/${pageName}.html`);

        if (!response.ok) {
            throw new Error("Page not found");
        }

        const html = await response.text();

        mainContent.innerHTML = html;

    } catch (error) {
        mainContent.innerHTML = `
            <div class="page-header">
                <h1>Page not found</h1>
                <p>Unable to load this page.</p>
            </div>
        `;

        console.error(error);
    }
}

//----------PAGE-NAVIGATION-----------//

const pageLinks = document.querySelectorAll("[data-page]");

function updateActiveSidebar(pageName) {
    
    const sidebarLinks = document.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach(function(item) {
        item.classList.remove("active");
    });

    const activeLink = document.querySelector(
        `.sidebar-link[data-page="${pageName}"]`
    );

    if(activeLink) {
        activeLink.classList.add("active");
    }
}

pageLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        const pageName = link.dataset.page;

        loadPage(pageName);

        updateActiveSidebar(pageName);
    });
});

loadPage("dashboard");
updateActiveSidebar("dashboard");