
function LanguageChange(lang)
{
    if(lang === "english")
    {
        eraseCookie("CurrentLanguage");
        writeCookie("CurrentLanguage", "English", 30);
        document.getElementById("btn_english").style.backgroundColor = "#ffffff";
        document.getElementById("btn_english").style.color = "#FF6600";
        document.getElementById("btn_spanish").style.backgroundColor = "#FF6600";
        document.getElementById("btn_spanish").style.color = "#ffffff";

        document.getElementById("txt_eat").innerHTML = "Eats";
        document.getElementById("txt_shopping").innerHTML = "Shopping";
        document.getElementById("txt_take_selfie").innerHTML = "Take Selfie";
        document.getElementById("txt_robot_avatar").innerHTML = "Robot Avatar";
        document.getElementById("vote-title").innerHTML = "Vote for who will win?";
    }
    else if (lang === "spanish")
    {
        eraseCookie("CurrentLanguage");
        writeCookie("CurrentLanguage", "Spanish", 30);
        document.getElementById("btn_english").style.backgroundColor = "#FF6600";
        document.getElementById("btn_english").style.color = "#ffffff";
        document.getElementById("btn_spanish").style.backgroundColor = "#ffffff";
        document.getElementById("btn_spanish").style.color = "#FF6600";

        document.getElementById("txt_eat").innerHTML = "Come";
        document.getElementById("txt_shopping").innerHTML = "Compras";
        document.getElementById("txt_take_selfie").innerHTML = "Tomar Selfie";
        document.getElementById("txt_robot_avatar").innerHTML = "Robot Avatar";
        document.getElementById("vote-title").innerHTML = "Vote por quién ganará?";
    }

}