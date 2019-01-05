
// var refresh = document.getElementsByClassName('gallery_p_b');	
// var refresh2 = document.getElementsByClassName('gallery_re');
// var table = document.querySelectorAll(".list_tbody .tb");
// var manduCnt = 0;
// var dieCnt =0;
// var mobileIP = ["115.161","121.190","122.202","122.32","175.202",
						   // "223.32","223.33","223.62","223.38","223.39",
						   // "223.57","39.7","110.70","175.223","175.252","210.125",
						   // "211.246","114.200","117.111","211.36","106.102","125.188"];

	// removeHTMLobject();

// window.onload = function(){
	// if (window.jQuery) {  
        // console.log("Yeah!");
    // } else {
        // console.log("Doesn't Work");
    // }
	// fuckmandu();
	// getReplyInfo(1);
	// var reply_dc = document.getElementsByClassName("reply");
	// if(reply_dc.length == 0){
		// setTimeout(function(){
			// fuckmandu();
			// getReplyInfo(2);
		// },1000);
	// }

// }

// function addGap(){
	// document.getElementById('dgn_content_de').style.paddingBottom = "300px";
// }

// for (var i = 0  ; i < refresh.length; i ++){
	// refresh[i].onclick = function () {
		// setTimeout(function(){
			// manduCnt = 0;
			// dieCnt =0;
			// fuckmandu();
			// getReplyInfo("페이지넘기기 / 1");
		// },1000);
	// };
	// refresh2[i].onclick = function () {
		// setTimeout(function(){
			// manduCnt = 0;
			// dieCnt =0;
			// fuckmandu();
			// getReplyInfo("페이지넘기기 / 1");
		// },1000);
	// };
// }


// function removeStyle(str){
	// str = str.replace("hidden", "visible");
	// return str;
// }
// function removeHTMLobject(){						//hidden to visible
	// for( var i = 0;  i  < table.length ; i++){
		// var tempT_subject = table[i].getElementsByClassName('t_subject')[0].outerHTML;
		// tempT_subject = removeStyle(tempT_subject);
		// table[i].getElementsByClassName('t_subject')[0].outerHTML = tempT_subject;
	// }
// }

// function getArticleInfo(str){
	// if(window.Worker){
		// w = new Worker("content2.js");
		// w.onmessage = function(event){
				// console.log("message : " + event.data);
		// };
	// }else{
		// alert('not supprot');
	// }
// }

// function fuckmandu(){		//댓글돌이 삭제
	// var id = document.querySelectorAll(".user.user_layer .user_nick_nm");
	// var table = document.getElementById("gallery_re_contents");
	// for(var i = id.length - 1; i > 0; i--){
		// var nick = id[i].innerText;
		// //console.log("아이디 : " + nick);
		// if(nick == "댓글돌이"){
			// table.deleteRow((i * 4) );
			// table.deleteRow((i * 4) );
			// table.deleteRow((i * 4) );
			// table.deleteRow((i * 4) );
			// console.log( i + "번 줄 댓글돌이사망");
			// manduCnt++;
		// }
	// }
// }

// function getReplyInfo(str){
	// console.log("==========Entered getReplyInfo==========");
	// var badstring = [];
	// var badIp = [];
	// badstring.length = 0;
	// var reply_dc = document.getElementsByClassName("reply");
	// var table = document.getElementById("gallery_re_contents");
		// console.log(reply_dc.length + "개 / " + str + "차");
	// for( var i = reply_dc.length - 1;  i > 0; i--){
	// var go = false;
		// var iplus = reply_dc[i].innerHTML.split('<span class=')[0].replace(/\n/g, "").replace(/\r/g, "").replace(/\s+$/g, "");
		// var iminus = reply_dc[i-1].innerHTML.split('<span class=')[0].replace(/\n/g, "").replace(/\r/g, "").replace(/\s+$/g, "");
		// var iminusIP = reply_dc[i-1].innerHTML.split('<span class="etc_ip">')[1];
		// var sim = similarity(iminus ,iplus);
		

		// if( sim > 0.8 && !iminus.includes("dcimg5")){
			// table.deleteRow(i * 4 - 4);
			// table.deleteRow(i * 4 - 4);
			// table.deleteRow(i * 4 - 4);
			// table.deleteRow(i * 4 - 4);
			// console.log(i + "번 라인과 " + (i - 1) + "번 라인 유사도" + (sim * 100).toFixed(2) + "%로 " + (i - 1)+"번 라인 삭제 " );
			// dieCnt++;
			// if(badstring.length == 0){
				// badstring.push(iminus);
				// console.log("도배 등록");
				// if(typeof iminusIP != "undefined"){
					// badIp.push(iminusIP);
					// console.log("ip : " + iminusIP.replace(/\n/g, "").replace(/\r/g, "").replace(/\s+$/g, ""));
				// }
			// }
			// if( badstring.length > 0 && similarity(badstring.slice(-1)[0], iminus) < 0.8){
				// badstring.push(iminus);
				// console.log("도배 등록");
				// if(typeof iminusIP != "undefined"){
					// badIp.push(iminusIP);
					// console.log("ip : " + iminusIP.replace(/\n/g, "").replace(/\r/g, "").replace(/\s+$/g, ""));
				// }
			// }
		// }
		// else{
			// for(var j = 0 ; j < badstring.length ; j ++){
				// var simmm = similarity(iminus, badstring[j])
				// if( simmm > 0.8){
					// table.deleteRow(i * 4 - 4);
					// table.deleteRow(i * 4 - 4);
					// table.deleteRow(i * 4 - 4);
					// table.deleteRow(i * 4 - 4);
					// dieCnt++;
					// console.log( i + "번 라인 캐시에 저장된 유사 문구로삭제. 유사도 : " + (simmm * 100).toFixed(2) + "%");
					// go = true;
					// break;
				// }
			// }
			// if(!go){
				// for(var zz = 0; zz < badIp.length; zz++){
					// if(badIp[zz] == iminusIP){
						// for(var zzz = 0 ; zzz< mobileIP.length; zzz++){
							// console.log( "type : " + typeof(iminusIP));
							// console.log (iminusIP.includes(mobileIP[zzz]) );
							// if(!iminusIP.includes(mobileIP[zzz])){
								// table.deleteRow(i * 4 - 4);
								// table.deleteRow(i * 4 - 4);
								// table.deleteRow(i * 4 - 4);
								// table.deleteRow(i * 4 - 4);
								// dieCnt++;
								// console.log("도배 IP : " + iminusIP.replace(/\n/g, "").replace(/\r/g, "").replace(/\s+$/g, "") + " 제거");
								// break;
							// }
						// }
					// }
				// }
			// }
		// }
	// }
	// console.log(manduCnt +"개의 댓글돌이와 "+ dieCnt + "개의 댓글이 죽었습니다.")
	// chrome.storage.sync.set({'mandu': manduCnt, 'die': dieCnt}, function() {
	  // console.log('Settings saved');
	// });
// }

// function deleteRow(r) {
    // var i = r.parentNode.parentNode.rowIndex;
    // document.getElementById("gallery_re_contents").deleteRow(i);
// }

// function similarity(s1, s2) {
  // var longer = s1;
  // var shorter = s2;
  // if (s1.length < s2.length) {
    // longer = s2;
    // shorter = s1;
  // }
  // var longerLength = longer.length;
  // if (longerLength == 0) {
    // return 1.0;
  // }
  // return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
// }

// function editDistance(s1, s2) {
  // s1 = s1.toLowerCase();
  // s2 = s2.toLowerCase();

  // var costs = new Array();
  // for (var i = 0; i <= s1.length; i++) {
    // var lastValue = i;
    // for (var j = 0; j <= s2.length; j++) {
      // if (i == 0)
        // costs[j] = j;
      // else {
        // if (j > 0) {
          // var newValue = costs[j - 1];
          // if (s1.charAt(i - 1) != s2.charAt(j - 1))
            // newValue = Math.min(Math.min(newValue, lastValue),
              // costs[j]) + 1;
          // costs[j - 1] = lastValue;
          // lastValue = newValue;
        // }
      // }
    // }
    // if (i > 0)
      // costs[s2.length] = lastValue;
  // }
  // return costs[s2.length];
// }