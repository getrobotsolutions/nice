//**************************************************************************
// Contents Templage JS : 2016.02.02
//                           
//
//   Comment : (1) Command to Robot(Flash -> JS Call -> Furoware Function Call)
//             (2)
//             (3)  
//
//**************************************************************************

// [ Variables Setting ] ---------------------------------------------------
var g_language;
var g_mute = 0;
var g_volume = 0.4;

function quiz_call(strContentsName)
{

	if(strContentsName == "Quiz")   
	{
		
		//if(strLanguage=="En") { PlaySpeech("Welcome to Amegan Quiz.");  }
		
		location.href = "../Quiz/Quiz.htm";
	}
}

// ChangeLanguage(language) : 언어 변경-------------------------------------
function ChangeLanguage(language)
{
	var lang = language;
	if( (language == "Korean")   || (language == "korean")   || (language == "Kr") || (language == "kr") ) lang = "ko-kr";
	if( (language == "English")  || (language == "english")  || (language == "En") || (language == "en") ) lang = "en-us";
	if( (language == "Japanese") || (language == "japanese") || (language == "Jp") || (language == "jp") ) lang = "ja-jp";
	if( (language == "Chinese")  || (language == "chinese")  || (language == "Cn") || (language == "cn") ) lang = "zh-cn";
	g_language = language;
	window.external.ChangeLanguage(lang);
}

// GetRobotID : Robot 고유 ID Retrun (예:'FRD01-00032') --------------------
function GetRobotID()
{
	return window.external.GetRobotID();
}


// GetCaptureImage : Capture된 Iamge를 Flash로 전송함 ----------------------
function GetCaptureImage()
{
	return window.external.GetCaptureImageBase64();
}


function GetCaptureImageBase64()
{
	return window.external.GetCaptureImageBase64();
}



// StartHumanFollow : 사람 추종 기능 설정 ----------------------------------
function StartHumanFollow(isEnable)
{
	window.external.StartHumanFollow(isEnable);
}


// StartFaceTracking : 얼굴 추적 기능 설정 ---------------------------------
function StartFaceTracking(isEnable)
{
	window.external.StartFaceTracking(isEnable);
}


// MakeRobotFace : 나도로봇 -------------------------------------------
function MakeRobotFace()
{
	return window.external.MakeRobotFace();
}


// DeleteRobotFace : 사진 아바타를 삭제함 -----------------------------------
function DeleteRobotFace()
{
	window.external.DeleteRobotFace();
}


// SetRobotFace : 나도로봇  ---------------------------------------------
function SetRobotFace()
{
	window.external.SetRobotFace();
}

function PlaySpeech2(speechString)
{

	window.external.PlaySpeech(speechString);
}
function PlaySpeech(speechString)
{
    dataKey = {'code':'001','playspeech': speechString};
    console.log("sending Key:" + JSON.stringify(dataKey));

    $.ajax({
        type: "GET",
        data: { key: JSON.stringify(dataKey)},
        url: "/api/sendresponse"
    });
}

function StopSpeech()
{
	window.external.StopSpeech();
}

// SetEmotion : 캐릭터 관련 ---------------------------------------------
function SetEmotion(emotion)
{
	window.external.SetEmotion(emotion);
}


function InitPose()
{
	window.external.InitPose();
}

function SetHeadRoll(roll, velocity)
{
	window.external.SetHeadRoll(roll, velocity);
}

function SetHeadPitch(pitch, velocity)
{
	window.external.SetHeadPitch(pitch, velocity);
}

function SetHeadYaw(yaw, velocity)
{
	window.external.SetHeadYaw(yaw, velocity);
}

function SetWaistPitch(pitch, velocity)
{
	window.external.SetWaistPitch(pitch, velocity);
}

function DriveWheel(linearVelocity, angularVelocity)
{
	window.external.DriveWheel(linearVelocity, angularVelocity);
}

function DriveWheelTime(linearVelocity, angularVelocity,nTime)
{
	window.external.DriveWheelTime(linearVelocity, angularVelocity,nTime);
}

function StopWheel()
{
	window.external.StopWheel();
}
//visual fence
function SetVisualFenceOnOff(isEnable){
	window.external.SetVisualFenceOnOff(isEnable);
}

function SetVoiceRecognition(isEnable)
{
	window.external.SetVoiceRecognition(isEnable);
}


function ContentsClose()
{
	window.external.ContentsClose();
}

//변수 : (string fileName, string printerName, int printCount)
function PrintImage(fileName, fileHex)
{
	var directory = "C:\\FutureRobot\\Contents\\FuroContents\\Photo\\";
	fileName = directory + fileName;
	
	window.external.PrintImage(fileName, "kodak", 1);
}


function AdjustVolume(isVolumeUp)
{
	window.external.AdjustVolume(isVolumeUp);
	//Beep();
}

function SetVolume(fLevel)
{
	//0 ~ 1
	g_volume = fLevel;
	window.external.SetVolume(fLevel);
	//Beep();
}

function SetMute(bMute)
{
	g_mute = bMute;
	window.external.SetMute(bMute);
	if (bMute == 0) Beep();
}

function Beep()
{
	window.external.Beep();
}

//변수 : (string savePath, string overlapImgPath)
function SaveImage(fileName)
{
	var directory = "C:\\FutureRobot\\Contents\\FuroContents\\Photo\\";
	var overlapImgPath = "C:\\FutureRobot\\Contents\\FuroContents\\logo.png";
	fileName = directory + fileName;
	isLogoPrint = true;
	window.external.SaveImage(fileName, overlapImgPath);
}

//ManagerState : bState -> true : Show, false : Hide.
function ManagerState(bState)
{
	window.external.ManagerState(bState)
}

//GetPassword: Config의 Password 받기.
function GetPassword()
{
	return window.external.GetPassword();
}





////////////////////////  미구현 지난 컨텐츠 목록//////////////////
function SetVisualServoing(bPara)
{
	//미구현
	StartFaceTracking(bPara);
}

function StopBehavior()
{
	//미구현
}

function PlayBehavior(behavior)
{
	//미구현
}

///////////////////////  컨텐츠 관련  /////////////////////// 



/* 미구현
// StopBehavior : 구동중인 Actuator 정지 -----------------------------------
function StopBehavior()
{
	window.external.StopBehavior();
}

// PlayLipSync : ???? -------------------------------------------------------
function PlayLipSync(speechString)
{
	window.external.PlayLipSync(speechString);
}

function StartIdleMotion(isEnable)
{
	window.external.StartIdleMotion(isEnable);
}



function PlayBehavior(behavior)
{
	window.external.PlayBehavior(behavior);
}


*/



//ADD / 2016.01.15
//---------------------------------------------------------------------------//
//-- Cookie Control ---------------------------------------------------------//
//---------------------------------------------------------------------------//
function writeCookie(name, value, days)
{
	var expires = "";
	
	//쿠키가 지속되는 날짜 수를 지정. 예) 30 = 30일
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name)
{
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	for (var i=0; i<cookies.length; i++) 
	{
		var c = cookies[i];
		while (c.charAt(0) == ' ')
		c = c.substring(1, c.length);
		if (c.indexOf(searchName) == 0)
		return c.substring(searchName.length, c.length);
	}
	return null;
}

function eraseCookie(name)
{
	//특정 쿠키를 삭제
	writeCookie(name, "", -1); //소멸일자 (-1일)를 소멸시켜 쿠키를 삭제함
}
//-[End Cookie Control]------------------------------------------------------//




// Added by Hong Joon 160114
// 동영상 재생 관련
function PlayAdMovie(htmlFilePath, x, y, width, height, repeat)
{	
	var curPath = GetCurrentFolderPath();
	curPath += htmlFilePath;
	
	window.external.PlayAdMovie(curPath, x, y, width, height, repeat);
}

function StopAdMovie()
{
	window.external.StopAdMovie();
}

function HideAdMovie()
{
	window.external.HideAdMovie();
}

function PauseAdMovie()
{
	window.external.PauseAdMovie();
}

function ResumeAdMovie()
{
	window.external.ResumeAdMovie();
}

function GetCurrentFolderPath()
{
	var path = window.location.pathname;
	path = path.substring(1,path.lastIndexOf("/")+1);

	return path;
}
//HE

function ShowImg(x,y,width,height){
	window.external.ShowImg(x,y,width,height);
}

function HideImg(){
	window.external.HideImg();
}