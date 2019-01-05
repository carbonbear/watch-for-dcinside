console.log("==========Entered content2.js==========");

var toRemoveImg;
var boolRemove;
var coordX;
var scrollPx;
var boolReplyOn;
var maxHeight;
var boolLockScroll;
var allOnOff = false;

var fuckad = [
"좌_표", 
"클_릭", 
"http://xn--950b215a4tea.xn--ob7b99fkj.xn--3e0b707e/"
]

chrome.storage.sync.get([
	'Resize_save',
	'Resize_over',
	'dcOnOff',
	'block_On',
	'blockingstring',
	'max_Height',
	'isTurnOnReply',
	'scroll_Lock',
	'whereputTooltip'
	], function(result) {
	  if(result.Resize_save){	//사진크기조정시
		//addStyleString('.tooltiptext .yt_thum_box .yt_movie {width :' +result.Resize_over+ 'px !important;}');	//유튜브 보류
	    addStyleString('.tooltiptext table{width :' + result.Resize_over +'px !important ;}');
		addStyleString('.tooltiptext img{max-width:' + result.Resize_over + 'px !important;}');
		addStyleString('.tooltiptext .reply_info .usertxt, .del_reply, .reply_info .comment_dccon {width: ' + result.Resize_over + 'px;}');
		addStyleString('.tooltiptext .usertxt, .comment_wrap .comment_dccon {width: ' + (result.Resize_over )+ 'px;}');
		}else{
	  }
	  
		addStyleString('.tooltiptext {max-height: ' +result.max_Height+ 'px;}');
	  boolRemove = result.block_On;
	  if(boolRemove){
		toRemoveImg = splitString(result.blockingstring)
	  }
	  boolLockScroll = result.scroll_Lock;
	  boolReplyOn = result.isTurnOnReply;
	  //console.log(toRemoveImg);
	  if(result.whereputTooltip != undefined)
		modifyXcoord(result.whereputTooltip);
	  if(result.dcOnOff){
		  allOnOff=true;
		  init();
	  }
});
var infocnt = 0;
var table = document.querySelectorAll(".ub-content:not(.gallview_head):not([id^='comment_li']):not([id^='reply_li'])");
function init(){
	for( var i = 0;  i  < table.length ; i++){
		if(table[i].getElementsByClassName('gall_num')[0].innerText.match(/^[0-9]+$/) != null)	{	//숫자일시
			var _link = table[i].getElementsByClassName('gall_tit ub-word')[0].getElementsByTagName('a')[0].href;
				getNotRec( i, _link, 0, "");
		}
		else{
			infocnt++;
		}
	}
}
function modifyXcoord(xcoord){ //0 ~ 100 -> -50 ~ 250
	var leftCoord = xcoord * 3 - 50;
	leftCoord = Math.floor(leftCoord);
	addStyleString('.tooltiptext {left : ' +leftCoord + '%; }');
}

function deleteArticleLine(index){
	table = document.querySelectorAll(".ub-content:not(.gallview_head):not([id^='comment_li']):not([id^='reply_li'])");
	table[index].outerHTML = "";	
}


function splitString(storedStr){
	var sstr = storedStr.split(/\r?\n/);
	var finishStr = new Array();	
	for(var process in sstr){
		var ttemp = sstr[process].split("/")[0];
		finishStr.push(ttemp);
	}
	//console.log(finishStr);
	return finishStr;
}

function deleteArticleByblock(article, index){
	//console.log(toRemoveImg);
	if(article.getElementsByClassName('appending_file').length != 0)
	for(var ii = 0 ; ii< article.getElementsByClassName('appending_file')[0].childElementCount ; ii++){
		for(var innerLoop in toRemoveImg){
			if(toRemoveImg[innerLoop] == article.getElementsByClassName('appending_file')[0].children[ii].innerText){
				console.log(index + "번 게시글 " +  ii+"번 첨부 찾음" );
				deleteArticleLine(index);
			}
		}
	    //console.log(index + "번 게시글 " +  ii+"번 첨부 : " +	article.getElementsByClassName('appending_file')[0].children[ii].innerText);
	}
}


function getNotRec(index, articleLink, trytimes, mode){
	var req = new XMLHttpRequest();
	req.timeout = 6000;
	var notrec = 0;
	var addstr = "/-" ;
	req.open('GET', articleLink, true);
	req.onreadystatechange = function (aEvt) {
	  if (req.readyState === 4) {
		 if(req.status === 200){
			var el = document.createElement('html');
			var indivContent = "";
			var  articleName = "";
			var writtenby = "";
			var replytest = "";
			var headers = req.getAllResponseHeaders();
			var loadedFailed = false;
			el.innerHTML = req.responseText;
			if(el.innerHTML.length < 30 && trytimes < 10){
				loadedFailed = true;
				//console.log("index : " + index + "tried : " + trytimes);
				getNotRec(index,articleLink, ++trytimes, mode);
				return;
			}
			writtenby = el.getElementsByClassName('nickname')[0].innerHTML;
			articleName = el.getElementsByClassName('title ub-word')[0].children[1].innerText;
			if(boolRemove){
				deleteArticleByblock(el, index);
			}
			var isIpExist = el.getElementsByClassName('ip')[0];
			if(isIpExist>0){
				if(el.getElementsByClassName('ip')[0].innerText!=""){
					writtenby += "&nbsp;&nbsp;";
					writtenby += el.getElementsByClassName('ip')[0].innerText;
				}
			}
			
			var howmanydccon=el.querySelectorAll('.written_dccon').length;
			var dccons = el.querySelectorAll('.written_dccon');
			if(howmanydccon > 0){
				for(var dcconIdx = 0; dcconIdx < howmanydccon; dcconIdx++){
					dccons[dcconIdx].className ="not_written_dccon";
				}
			}
			var ttt = el.getElementsByClassName("gallview_contents")[0].innerHTML;
			indivContent += el.getElementsByClassName('writing_view_box')[0].innerHTML;
			for(var ii =0; ii<fuckad.length; ii++){
				if(indivContent.includes(fuckad[ii])){
					deleteArticleLine(index);
					console.log("AD reomved by " + fuckad[ii] + "Line : " + index);
					break;
				}
			}
			//addstr += notrec =  el.getElementsByClassName('t_black')[0].innerText;
		   // table[index].getElementsByClassName('t_hits')[1].innerText +=addstr ;
		   
		   var pictureOption;

		   var howmanyreplyString = parseInt(el.querySelector('.gall_comment').innerText.substr(3)) > 0 ? parseInt(el.querySelector('.gall_comment').innerText.substr(3)) + '개의 댓글이 있어요!' : '댓글이 없네요 ㅠㅠ';
		   var scrollLockStr = `onmouseenter ="lockScroll()" onmouseleave ="unlockScroll()"`;
		   if(!boolLockScroll){
				scrollLockStr = "";
		   }
		   var replyStr = `<div id = "showcomment" onmouseover = "chowCommentfun('` + 
			el.querySelector('[name="gallery_id"]').value + `',` +
			el.querySelector('[name="gallery_no"]').value + `,'`+ 
			el.querySelector('[name="e_s_n_o"]').value + `', `+ 
			index +
			`)"><div id = "showcommentintro"></br></br></br></br></br></br>댓글 보기</br></br></br>` 
			+ howmanyreplyString +` </br></br></br></br></br></br></br></br></br><div id = "reRefreshDiv"></div></div></div>`;
			if(!boolReplyOn){
				replyStr = "";
			}
			var injec =  `<span class="tooltiptext" `+ scrollLockStr+`><div id="articleinfo"> 제&nbsp;&nbsp;목 : `+ articleName +`<br> 글쓴이 : ` + writtenby +`</div>`+indivContent +
			`</br></br>` +replyStr +`</span>`;
			
			if(mode.length>0){
				var tempTbody = $(document).find('tbody');
				tempTbody.children()[index].insertAdjacentHTML("beforebegin", mode);    
				if(allOnOff)
					tempTbody[0].getElementsByClassName('gall_tit ub-word')[index].getElementsByTagName('a')[0].innerHTML += injec;		
				tempTbody = $(document).find('tbody');
				deleteArticleLine(tempTbody.children().length - 1);
					$("tbody tr").unbind();
					$("tbody tr").mouseenter(function(e){
						targetIdx = $(this).index();
						//console.log($(this).index());
					});
			}else{			
				table[index].getElementsByClassName('gall_tit ub-word')[0].getElementsByTagName('a')[0].innerHTML += injec;				
			}
 
		 }
		 else{
			notrec = 'error';
			console.log("Error loading page : " + index );
		 }
	  }
	};
	req.send(null);
	return notrec;
}
var timerunning = true;
function setTimeRunningTrue(){
	timerunning = true;
}

 var targetIdx;
/*첫 바인드 이벤트*/
 $("tbody tr").mouseenter(function(e){
		targetIdx = $(this).index();
		//console.log($(this).index());
 });
 
function chowCommentfun(gall_id, articleIdx, esno, Idx){
	table = document.querySelectorAll(".ub-content:not(.gallview_head):not([id^='comment_li']):not([id^='reply_li'])");
	Idx = targetIdx;
	
	if(timerunning){
			var commentBox = getCommentbyAjax(
					gall_id,
					articleIdx,
					esno,
					1,
					0
					);
				if(commentBox != ""){
					table[Idx].querySelector('#showcomment').outerHTML = table[Idx].querySelector('#showcomment').outerHTML.replace("chowCommentfun", "shuwfun");
					var renewReply = `<div id = "showcomment" onmouseover = "chowCommentfun('` + 
													gall_id + `',` +
													articleIdx + `,'`+ 
													esno + `', `+ 
													Idx +
													`)"><div id = "showcommentintro"></br></br>댓글을 새로고침 하려면</br>여기에 마우스를 올려주세요</br></br></br></div></div>`
					table[Idx].querySelector('#showcomment').innerHTML = commentBox + renewReply;
					table[Idx].querySelector('#showcomment').innerHTML += "</br></br></br>";
					//table[Idx].querySelector('reRefreshDiv').innerHTML = renewReply;
					timerunning = false;
					setTimeout(setTimeRunningTrue, 1000);

				}else{
					table[Idx].querySelector('#showcomment').innerHTML = 
					`<div style = "text-align: center; border-top : solid 1px #ddd;">\r\n\r\n아직도 댓글이 없네요\r\n\r\n새로고침 하려면 마우스를 올려주세요!\r\n\r\n\r\n\r\n</div>`;
					timerunning = false;
					setTimeout(setTimeRunningTrue, 1000);
				}
	}else{
	}
}
function shuwfun(gall_id,articleIdx, esno,Idx){
	
}

function lockScroll(){
	if(document.documentElement.scrollTop != 0){
		scrollPx = (document.documentElement.scrollTop);
	}
	$('body').css('top', -scrollPx + 'px').addClass('noscroll');
}

function unlockScroll(){
	$('body').removeClass('noscroll');
	scrollTo(0,scrollPx);
}

function getCommentbyAjax(_id, _no, _e_s_n_o, _comment_page, trytimes){
var htmlCommentBox ="";
	    $.ajax({
		type:'POST',
        url:'/board/comment/',
		cache: false,
		async: false,
		dataType: "json",
        data:{ id:_id, no: _no, cmt_id:_id, cmt_no:_no, e_s_n_o: _e_s_n_o, comment_page: '1', sort: 'D', prevCnt: '4', board_type: undefined},
        success:function(data){		
			try {
				var comments = data.comments;
				var total_cnt = data.total_cnt;
				 //console.log(comments);
				 //console.log(total_cnt);
				 if(total_cnt == 0){
					 return 'n';
				 }
				if(comments !== null && true){
					htmlCommentBox = "<div class=\"comment_box\">";
					htmlCommentBox += getCommentListHtml(comments, no);
					htmlCommentBox += "<div class=\"bottom_paging_box\">";
				}

			} catch(e) {
				console.log(e);
			}
		}
	}).fail(
		function(xhr, status, error){
			console.log("댓글불러오기실패");
			console.log(xhr);
			console.log(status);
			console.log(error);
			if(trytimes <10){
				htmlCommentBox =  getCommentbyAjax(_id, _no, _e_s_n_o, _comment_page, ++trytimes);
				return;
			}
		}
		
	);
	return htmlCommentBox;
}


function recursiveChild(node, para){
	 for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      para += child.innerHTML;
      recursiveChild(child, para);
    }
	console.log("return : " + para);
}

function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

/*modify css*/
function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

var getCommentListHtml = function(comments, article_no) {
	var htmlComment = "";
	var cur_c_no = 0;
	var comment_start = false;
	var reply_start = false;
	var cmt_wr = $("#cmt_wr").val();
	
	htmlComment = "<ul class=\"cmt_list\">";
	
	$.each(comments, function(key, value){
		
		var dory_class = ''; //댓글돌이
		var reply_area_all_cls = ' btn_reply_write_all'; //답글쓰기 전체 영역 클래스
		
		if(comments[key]['nicktype'] == "COMMENT_BOY") { //댓글돌이 답글쓰기 안됨.
			dory_class = " dory";
			reply_area_all_cls = '';
		}
		if(comments[key]['vr_player'] || comments[key]['reply_w'] == 'N') { reply_area_all_cls = '';} //보이스 리플 답글쓰기 영역 전체 x
				
		if(comments[key]['depth'] == 0) {
			
			comment_start = true;
		
			htmlComment += "<li id=\"comment_li_"+comments[key]['no']+"\" class=\"ub-content"+dory_class+"\">";
			htmlComment += "<div class=\"cmt_info clear\" data-no=\""+comments[key]['no']+"\" data-rcnt=\""+comments[key]['rcnt']+"\" data-article-no=\""+article_no+"\">";
			if(comments[key]['del_yn'] != 'Y') {
				htmlComment += "<div class=\"cmt_nickbox\">";
				htmlComment += "<span class=\"gall_writer ub-writer\" data-nick=\""+comments[key]['name']+"\" data-uid=\""+comments[key]['user_id']+"\" data-ip=\""+comments[key]['ip']+"\">"+ comments[key]['gallog_icon'] +"</span>";
				htmlComment += "</div>";
				htmlComment += "<div class=\"clear cmt_txtbox"+reply_area_all_cls+"\">";
				if(comments[key]['vr_player']) {
					htmlComment += comments[key]['vr_player'];
					htmlComment += "<button type=\"button\" class=\"transparent_btn btn_reply_write\">답글쓰기</button>";
				} else if(dory_class != "") { //댓글돌이
					htmlComment += comments[key]['memo'];
				} else {
					if (comments[key]['memo'].match('written_dccon')) {
						htmlComment += '<div class="comment_dccon clear"><div class="coment_dccon_img">' + $.trim(comments[key]['memo']) +'</div>';
						htmlComment += '<div class="coment_dccon_info clear dccon_over_box" onmouseover="dccon_btn_over(this);" onmouseout="dccon_btn_over(this);" style="display:none;"><span class="over_alt"></span><button type="button" class="btn_dccon_infoview div_package" data-type = "comment" onclick="dccon_btn_click();" reqpath="/dccon">디시콘 보기</button></div></div>';
					} else {
						htmlComment += "<p class=\"usertxt ub-word\">"+comments[key]['memo'].replace(/(?:\r\n|\r|\n)/g, '<br>')+"</p>";
					}
				}
				htmlComment += "</div>";
				htmlComment += "<div class=\"fr clear\">";
				htmlComment += "<span class=\"date_time\">"+comments[key]['reg_date']+"</span>";
			} else {
				htmlComment += "<div class=\"cmt_nickbox\"></div>";
				
				htmlComment += "<p class=\"del_reply\">"+comments[key]['memo']+"</p>";
				
			}
			if(comments[key]['nicktype'] !== "COMMENT_BOY" && comments[key]['del_yn'] != 'Y') {
				//if(cmt_wr >= 9) htmlComment += "<button type=\"button\" class=\"font_red btn_reply_write\">답글쓰기<em class=\"sp_img icon_blue_show\"></em></button>";
				htmlComment += "<div class=\"cmt_mdf_del\" data-type=\"cmt\" re_no=\""+comments[key]['no']+"\" data-my=\""+comments[key]['my_cmt']+"\" data-article-no=\""+article_no+"\">";
				htmlComment += "</div>";
				htmlComment += "</div>";
			}
			htmlComment += "</div>";
			
			if(comment_start && comments[key]['next_type'] == 0) { //답글 닫아주기
				htmlComment += "</li>";
				comment_start = false;
			}
		} else {
			if(cur_c_no != comments[key]['c_no']) {
				reply_start = true;
				
				htmlComment += "<li><div class=\"reply show\">";
				htmlComment += "<div class=\"reply_box\">";
				htmlComment += "<ul class=\"reply_list\" id=\"reply_list_"+comments[key]['c_no']+"\">";
				cur_c_no = comments[key]['c_no'];
			}
				
			htmlComment += "<li id=\"reply_li_"+comments[key]['no']+"\" class=\"ub-content"+dory_class+"\">";
			htmlComment += "<div class=\"reply_info clear\" data-no=\""+comments[key]['no']+"\">";
			if(comments[key]['del_yn'] != 'Y') {
				htmlComment += "<div class=\"cmt_nickbox\">";
				htmlComment += "<span class=\"gall_writer ub-writer\" data-nick=\""+comments[key]['name']+"\" data-uid=\""+comments[key]['user_id']+"\" data-ip=\""+comments[key]['ip']+"\">"+ comments[key]['gallog_icon'] +"</span>";
				htmlComment += "</div>";
				htmlComment += "<div class=\"clear cmt_txtbox\">";
				if(comments[key]['vr_player']) {
					htmlComment += "<p class=\"uservoice\">"+comments[key]['vr_player']+"</p>";
				} else if(dory_class != "") { //댓글돌이
						htmlComment += comments[key]['memo'];
				} else {
					if (comments[key]['memo'].match('written_dccon')) {
						htmlComment += '<div class="comment_dccon clear"><div class="coment_dccon_img">' + $.trim(comments[key]['memo']) +'</div>';
						htmlComment += '<div class="coment_dccon_info clear dccon_over_box" onmouseover="dccon_btn_over(this);" onmouseout="dccon_btn_over(this);" style="display:none;"><span class="over_alt"></span><button type="button" class="btn_dccon_infoview div_package" data-type = "reply" onclick="dccon_btn_click();" reqpath="/dccon">디시콘 보기</button></div></div>';
					} else {
						htmlComment += "<p class=\"usertxt ub-word\">" + comments[key]['memo'].replace(/(?:\r\n|\r|\n)/g, '<br>') + "</p>";
					}
					
				}
				htmlComment += "</div>";
				htmlComment += "<div class=\"fr clear\">";
				htmlComment += "<span class=\"date_time\">"+comments[key]['reg_date']+"</span>";
			} else {
				htmlComment += "<div class=\"clear\">";
				htmlComment += "<div class=\"cmt_nickbox\"></div>";
				htmlComment += "<p class=\"del_reply\">" + comments[key]['memo'].replace(/(?:\r\n|\r|\n)/g, '<br>') + "</p>";
			}
			if(comments[key]['nicktype'] !== "COMMENT_BOY" && comments[key]['del_yn'] != 'Y') {
				if(comments[key]['del_btn'] == 'Y' || comments[key]['mod_btn'] == 'Y'){ 
					htmlComment += "<div class=\"cmt_mdf_del\" data-type=\"rep\" re_no=\""+comments[key]['no']+"\" data-my=\""+comments[key]['my_cmt']+"\" data-article-no=\""+article_no+"\">";
					if(comments[key]['mod_btn'] == 'Y') htmlComment += "<button type=\"button\" class=\"btn_cmt_modify\">수정</button>";
					if(comments[key]['del_btn'] == 'Y') htmlComment += "<button type=\"button\" class=\"btn_cmt_delete\">삭제</button>";
					htmlComment += "</div>";
				}
			}
			htmlComment += "</div>";
			htmlComment += "</div>";
			htmlComment += "</li>";
			
			if(reply_start && comments[key]['next_type'] == 0) { //답글 닫아주기
				htmlComment += "</ul>";
				htmlComment += "</div>";
				htmlComment += "</div>";
				htmlComment += "</li>";
				reply_start = false;
			}
		}
		
	});
	htmlComment += "</ul>";
	
	return htmlComment;	
};


/*
새로고침
*/

window.onload = function () {
	var insertHTML = `<button type="button" id = "refreshBtn" class="" onclick="particialReload(0)"><span>새로고침</span></button> 
									<input type="number" id="reloadTime" min="3" max="1000">
									<button type="button" id = "autoRefreshBtn" class="autoRefreshUnactivatedBtn" onclick="startAutoRefresh()"><span>초마다 자동 새로고침</span><div id = "innerLoopdiv" class = "autoRefreshUnactivated" ></div></button>`;
	if($(document).find('.array_tab.left_box')[0] != undefined){
		$(document).find('.array_tab.left_box')[0].children[2].insertAdjacentHTML("afterend", insertHTML);
		document.getElementById('reloadTime').value = 10;
	}
	if($(document.getElementsByClassName('view_bottom_btnbox clear')).find('.fl')[0]!=undefined){
		var insertHTML1 = `<button type="button" class="btn_white concept" id = "refreshBtn" class="" onclick="particialReload(0)"><span>새로고침</span></button>`;
		$(document.getElementsByClassName('view_bottom_btnbox clear')).find('.fl')[0].insertAdjacentHTML("beforeend", insertHTML1);
	}
	var loadfinish = $(document).find('.gall_list');
	if(loadfinish.length == 0){
		document.body.innerText = "서버 상황이 안좋습니다. \r\n새로고침 해주세요.";
		//setTimeout(reload, 1000);
	}
}
function reload(){
window.location.reload(true);
}

var s;
var newArticleInfoArray = new Array();
//var isNumCheck = /^\d+$/.test(val);

// string.match(/^[0-9]+$/) != null; => 숫자다

var myTimeout;
function startAutoRefresh(){
	var durationValue = document.getElementById('reloadTime').value < 3 ? 3 : document.getElementById('reloadTime').value;
	if ( document.getElementById("autoRefreshBtn").classList.contains('autoRefreshUnactivatedBtn')){			/*btn : unactivate -> activate*/
		document.getElementById("autoRefreshBtn").classList.remove('autoRefreshUnactivatedBtn')
		document.getElementById("autoRefreshBtn").classList.add('autoRefreshActivatedBtn');
		autoReload(durationValue);
		myTimeout = setInterval("autoReload("+durationValue +")", durationValue * 1000);
	}else if(document.getElementById("autoRefreshBtn").classList.contains('autoRefreshActivatedBtn')){		/*btn : activate -> unactivate*/
		document.getElementById("autoRefreshBtn").classList.remove('autoRefreshActivatedBtn')
		document.getElementById("autoRefreshBtn").classList.add('autoRefreshUnactivatedBtn');
		clearInterval(myTimeout);
	}
	if ( document.getElementById("innerLoopdiv").classList.contains('autoRefreshUnactivated')){				/*div : unactivate -> activate*/
		document.getElementById("innerLoopdiv").classList.remove('autoRefreshUnactivated')
		document.getElementById("innerLoopdiv").classList.add('autoRefreshActivated');
	}else if(document.getElementById("innerLoopdiv").classList.contains('autoRefreshActivated')){			/*div : activate -> unactivate*/
		document.getElementById("innerLoopdiv").classList.remove('autoRefreshActivated')
		document.getElementById("innerLoopdiv").classList.add('autoRefreshUnactivated');
	}
	addStyleString('.autoRefreshActivated { animation-duration: '+ durationValue + 's;' );
}
function autoReload(time){
	//console.log("오토리로드 등장");
	particialReload(0);
}

function particialReload(trytimes){
	document.getElementById('refreshBtn').innerText ="새로고침중...";
$.ajax({
        type: "GET",
        url: window.location.href,
        timeout: 6000,
        dataType: "html",
        success: function(data){
			 s = data;
			 addArticle(trytimes);
			document.getElementById('refreshBtn').innerText ="새로고침 완료!";
			setTimeout(function(){
				document.getElementById('refreshBtn').innerText ="새로고침";
			},700);
        }
    }).fail(
		function(xhr, status, error){
			if(trytimes <30){
				console.log("시도" + trytimes);
				if(trytimes == 29){
					document.getElementById('refreshBtn').innerText  = "다시 눌러 주세요";
				}
				particialReload(++trytimes);
				return;
			}
		}
	);
}

function addArticle(trytimes){
	var newInformationTable = new Array();
	var newtable = $(s).find('tbody')[0];
	var ztable = $(document).find('tbody')[0];
	if(newtable==undefined){
		//console.log(trytimes + " in addArticle");
		if(trytimes <30){
			particialReload(++trytimes);
		}
		return;
	}
	var nlen = newtable.childElementCount;
	var len = ztable.childElementCount;
	var originArticleIndex = -1;	//공지 제외 시작idx
	var originArticleLateName;
	var maxArticleNumber = 1;
	/*게시글 리뉴얼 위하여*/
	for(var i = 0 ; i< nlen;i ++){
		var newInnerInformationTable = new Array();
		var nArticleNumber = newtable.children[i].children[0].innerText;
		var nReplyNumber = "";
		if(newtable.children[i].getElementsByClassName('reply_num')[0] != undefined){
			nReplyNumber = newtable.children[i].getElementsByClassName('reply_num')[0].innerText;
		}
		var nArticleClickNum = newtable.children[i].children[ newtable.children[i].childElementCount -2 ].innerText;
		var nArticleThumbUp = newtable.children[i].children[ newtable.children[i].childElementCount -1 ].innerText;
	    newInnerInformationTable.push(nReplyNumber, nArticleClickNum,nArticleThumbUp);
		//console.log(newInnerInformationTable);
		newInformationTable[nArticleNumber] = newInnerInformationTable;
	}
	
	for(var i = 0 ; i< len ;i++){
		if(ztable.children[i].children[0].innerText.match(/^[0-9]+$/) != null && !ztable.children[i].children[1].innerHTML.includes('<b>') && originArticleIndex == -1){
			originArticleIndex = i;
		}
		if(ztable.children[i].children[0].innerText.match(/^[0-9]+$/) != null){
			maxArticleNumber = maxArticleNumber <  parseInt(ztable.children[i].children[0].innerText) ? parseInt(ztable.children[i].children[0].innerText) : maxArticleNumber;
			if(newInformationTable[ztable.children[i].children[0].innerText] != null){
				var internerArray = newInformationTable[ztable.children[i].children[0].innerText];
				if(ztable.children[i].getElementsByClassName('reply_num')[0]!=undefined){													//댓글
					ztable.children[i].getElementsByClassName('reply_num')[0].innerText = internerArray[0];
				}else if(internerArray[0]!=""){
					var sdfdsfa = `<a class="reply_numbox" href="http://gall.dcinside.com/mgallery/board/view/?id=gfl2&amp;no=`
							+ ztable.children[i].children[0].innerText + `&amp;t=cv&amp;page=1"><span class="reply_num">`+ internerArray[0] +`</span></a>`;
					//ztable.children[i].getElementsByClassName('gall_tit ub-word').add~~~
					ztable.children[i].getElementsByClassName('gall_tit ub-word')[0].insertAdjacentHTML("beforeend", sdfdsfa);    
					console.log();
					
				}
				ztable.children[i].children[ ztable.children[i].childElementCount - 2 ].innerText =  internerArray[1];		//조회수
				ztable.children[i].children[ ztable.children[i].childElementCount - 1 ].innerText =  internerArray[2];		//개추수
			}
		}
	}
	var newArticleNumber;
	for(var i = nlen-1 ; i >= originArticleIndex ;i--){
		newArticleNumber = parseInt(newtable.children[i].children[0].innerText);		
		if(maxArticleNumber < newArticleNumber){		
			//console.log("신입 게시글   idx : " + i + " 번호 : " +newArticleNumber + " originArticleIndex : " + originArticleIndex );
			var insertHTML = newtable.children[i].outerHTML;
			var _link = newtable.children[i].getElementsByTagName('a')[0].href;
			getNotRec(originArticleIndex, _link, 0, insertHTML);
		}
	}
	 
}

function renewArticle(){
	
	
}