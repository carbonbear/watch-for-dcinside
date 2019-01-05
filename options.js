function save_options() {
	var blockItem = document.getElementById('blockitem').value.toString();
  var oversize = document.getElementById('howmuch_size').value;
  var IsResize = document.getElementById('IsResize').checked;
  var OnOff = document.getElementById('on_off').checked;
  var blockOn = document.getElementById('block').checked;
  var showReply = document.getElementById('turnOnReply').checked;
  var xCoord  = document.getElementById('Xcoordi').value;
  var scrollLock  = document.getElementById('scrollLock').checked;
  var maxHeight = document.getElementById('maxPxheight').value;
  chrome.storage.sync.set({
    Resize_save: IsResize,
	Resize_over: oversize,
	dcOnOff: OnOff,
	max_Height:maxHeight,
	block_On: blockOn,
	blockingstring:blockItem,
	isTurnOnReply:showReply,
	scroll_Lock:scrollLock,
	whereputTooltip : xCoord
  }, function() {
    var status = document.getElementById('status');
    status.textContent = '옵션 저장됨!';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function temp(){
}

function get_options(){
        chrome.storage.sync.get([
		'Resize_save',
		'Resize_over',
		'dcOnOff',
		'block_On',
		'max_Height',
		'blockingstring',
		'isTurnOnReply',
		'whereputTooltip',
		'scroll_Lock'
		], function(result) {
		  document.getElementById('IsResize').checked = result.Resize_save;
		  if(result.Resize_over != null){
			document.getElementById('howmuch_size').value = result.Resize_over;
		  }
		  document.getElementById('maxPxheight').value = result.max_Height;
		  document.getElementById('on_off').checked = result.dcOnOff;
		  document.getElementById('block').checked = result.block_On;
		  document.getElementById('blockitem').value = result.blockingstring;
		  document.getElementById('turnOnReply').checked = result.isTurnOnReply;
		  document.getElementById('scrollLock').checked = result.scroll_Lock;
		  if(result.whereputTooltip!= undefined){
			document.getElementById('Xcoordi').value = result.whereputTooltip; 
		  }else{
			  document.getElementById('Xcoordi').value = 54; 
		  }
		  console.log(result.blockingstring);
		  if(result.blockingstring == "" || result.blockingstring == null){
			  document.getElementById('blockitem').value = "파일명/설명(설명은 없어도 무관)을 적어주세요! \r\n파일명 뒤에 띄어쓰기 없어야 합니다.\r\n자세한 설명은 아래 차단 방법 설명에 마우스를 올려주세요!";
		  }
        });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    IsResize: true
  }, function(items) {
    document.getElementById('hi').value = items.favoriteColor;
    document.getElementById('IsResize').checked = items.IsResize;
  });
}

document.addEventListener('DOMContentLoaded', get_options);
document.getElementById('save').addEventListener('click', save_options);
//document.getElementById('blockitembutton').addEventListener('click', temp);
	
chrome.storage.sync.get(null, function(items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
});
	
chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
 });