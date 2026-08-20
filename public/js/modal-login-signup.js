let body = document.querySelector("body");
let closeButton = document.querySelectorAll(".close-button i");
let modalOverlay = document.querySelector(".modal-overlay");
let loginSignup = document.querySelector(".nav-menu-div .login-signup");
let logout = document.querySelector(".nav-menu-div .logout");
let hiddenLoginSignup = document.querySelector(
    ".hidden-nav-elements .login-signup",
);
let hiddenLogout = document.querySelector(".hidden-nav-elements .logout");
let createAccount = document.querySelector(".login-btn-div a");
let loginBtn = document.querySelector(".login-btn-div button");
let loginAnchorTag = document.querySelector(".signup-btn-div a");
let register = document.querySelector(".modal-overlay .register");
let login = document.querySelector(".modal-overlay .login");
let loginForm = document.querySelector(".login-form");
let registerForm = document.querySelector(".register-form");
let invalidCredentialStrongFlash = document.querySelector(
    ".invalid-credentials-flash-div strong",
);
let invalidCredentialsFlashDiv = document.querySelector(
    ".invalid-credentials-flash-div",
);
let invalidCredentialsFlashBtnClose = document.querySelector(
    ".invalid-credentials-flash-div button",
);
let userExistStrongFlash = document.querySelector(
    ".user-exist-flash-div strong",
);
let userExistFlashDiv = document.querySelector(".user-exist-flash-div");
let userExistFlashBtnClose = document.querySelector(
    ".user-exist-flash-div button",
);
let backwardBtn = document.querySelector(".backward-btn i");
let editBtn=document.querySelector(".row-btns .edit");
let editFormAllInputs=document.querySelectorAll(".edit-form input");

if(closeButton){
    closeButton.forEach((el) => {
        el.addEventListener("click", (event) => {
            const cleanUrl =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname;
            modalOverlay.classList.add("hidden");
            body.style.overflow = "auto";
            setTimeout(() => {
                window.history.replaceState({ path: cleanUrl }, "", cleanUrl);
                window.location.reload();
            }, 400);
        });
    });
}

if (loginSignup) {
    loginSignup.addEventListener("click", (event) => {
        event.preventDefault();
        register.classList.add("hidden-register");
        login.classList.remove("hidden-login");
        modalOverlay.classList.remove("hidden");
        body.style.overflow = "hidden";
    });
}

if (logout) {
    logout.addEventListener("click", async (event) => {
        event.preventDefault();
        let response = await axios.post("/user/logout");
        console.log("hiiiiiiiiiiiiiiiiiiiiiii");
        if (response.data.success) {
            window.location.href = "/listing";
        }
    });
}

if (hiddenLoginSignup) {
    hiddenLoginSignup.addEventListener("click", (event) => {
        event.preventDefault();
        register.classList.add("hidden-register");
        login.classList.remove("hidden-login");
        modalOverlay.classList.remove("hidden");
        body.style.overflow = "hidden";
    });
}

if (hiddenLogout) {
    hiddenLogout.addEventListener("click", async (event) => {
        event.preventDefault();
        let response = await axios.post("/user/logout");
        if (response.data.success) {
            window.location.href = "/listing";
        }
    });
}

if (createAccount) {
    createAccount.addEventListener("click", (event) => {
        event.preventDefault();
        login.classList.add("hidden-login");
        register.classList.remove("hidden-register");
    });
}

if (loginAnchorTag) {
    loginAnchorTag.addEventListener("click", (event) => {
        event.preventDefault();
        register.classList.add("hidden-register");
        login.classList.remove("hidden-login");
    });
}

let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

document.addEventListener("DOMContentLoaded", async (event) => {
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData);

            let response = await axios.post("/user/login", data);
            if (response.data.success) {
                console.log(response);
                window.location.href = response.data.redirectTo;
            } else if (!response.data.success) {
                invalidCredentialStrongFlash.textContent = `${response.data.message}`;
                invalidCredentialsFlashDiv.classList.remove("hidden");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData);

            let response = await axios.post("/user/signup", data);
            if (response.data.success) {
                window.location.href = "/listing";
            } else if (!response.data.success) {
                console.log("first");
                console.log(response.data.success);
                userExistStrongFlash.textContent = `${response.data.message}`;
                console.log("second");
                userExistFlashDiv.classList.remove("hidden");
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("login") === "true") {
        event.preventDefault();
        register.classList.add("hidden-register");
        login.classList.remove("hidden-login");
        modalOverlay.classList.remove("hidden");
        body.style.overflow = "hidden";
    }
});

if (invalidCredentialsFlashBtnClose) {
    invalidCredentialsFlashBtnClose.addEventListener("click", (event) => {
        invalidCredentialsFlashDiv.classList.add("hidden");
    });
}

if (userExistFlashBtnClose) {
    userExistFlashBtnClose.addEventListener("click", (event) => {
        userExistFlashDiv.classList.add("hidden");
    });
}

if (backwardBtn) {
    backwardBtn.addEventListener("click", (event) => {
        window.location.href = "/listing";
    });
}

if(editBtn){
    editBtn.addEventListener("click",(event)=>{
        
    })
}