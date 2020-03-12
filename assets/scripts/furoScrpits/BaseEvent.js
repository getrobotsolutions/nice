//**************************************************************************
// Contents Templage JS : 2014.10.28  by Lee Won Yong
//                           Ver : 20141028
//
//   Comment : (1) Command to Contents(Furoware -> JS Call -> Flash Function Call)
//             (2)
//             (3)  
//**************************************************************************





// SetRobotID : Robot 고유 ID Retrun (예:'FRD01-00032') --------------------  ==> 현재 사용하지 않음.
function SetRobotID(robotID)
{
	g_robotID = robotID;	//??? g_robotID 가 정의되어 있지 않음.
	App.SetRobotID(robotID);
}


//------------------------------------------------------------//
//---------현재까지의 버전에서 check된 내용 마지막줄----------//
//------------------------------------------------------------//

// 주행 시나리오 상태 전달
function RobotNotify(status, message)
{
	App.RobotNotify(status, message);
}

function LoadFlash(fileName)
{
	//App.LoadMovie(0,fileName);
}

function ChangeFrame(frameName)
{
	//App.ChangeFrame(frameName);
}

function OnTTSCompleted()
{
	//App.OnTTSCompleted();
}

function OnMotionCompleted()
{
	//App.OnMotionCompleted();
}

function OnUserApproached()
{
	App.OnUserApproached();
	//PlaySpeech2("Hello Pritesh");
}

function OnUserDisappeared()
{
	//App.OnUserDisappeared();
}

function OnVoiceRecognized()
{
	//App.OnVoiceRecognized();
}

function OnRfidRecognized(cardSN)
{
	//App.OnRfidRecognized(cardSN);
}

function OnPlaySpeechTime(speechTime)
{
}

function OnPlaySpeechStarted(visemes)
{
	//App.SetLips(visemes);
}

function OnEmotionChanged(emotion)
{
	//switch (emotion)
	//{
	//case "joy": App.SetHappy(); break;	
	//case "sadness": App.SetSad(); break;	
	//case "surprise": App.SetSurprise(); break;	
	//case "angry": App.SetAngry(); break;	
	//}
}

function OnNavigationGoalCompleted(goal)
{
}

function OnJoystickButton(button)
{
	if( button == "B0" )
	{
	}
	else if( button == "B1" )
	{
	}
	else if( button == "B2" )
	{
	}
	else if( button == "B3" )
	{
	}
}

function OnXtionGesture(sign)
{
	//alert(sign);
}

function OnFaceChanged(faceName)
{
	//LoadFlash(faceName + '.swf');
}

function SetCamImage(data)
{
	App.SetCamImage(data);
}

function SetScreenMessage(msg)
{
	App.SetScreenMessage(msg);
}

function SetPhonePicture(data)
{
	App.SetPhonePicture(data);
}


