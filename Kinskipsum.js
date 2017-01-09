var QuotesParagraph = [];
var QuotesHeading   = [];
var QuotesSuheading   = [];
//---------------------------------------------------------------
var QuotesAmountParagraph = 4;
//---------------------------------------------------------------
var ParagraphTextBlock   = $('.paragraphText');
var HeadingText          = $('.headingText');
var SubHeadingText          = $('.subHeadingText');

//---------------------------------------------------------------

function AddListeners(){
$('.paragraphText').click(function(){OnCopyToClipBoard(this);});
$('.headingText').click(function(){OnCopyToClipBoard(this);});
$('.subHeadingText').click(function(){OnCopyToClipBoard(this);});
//---------------------------------------------------------------
$(document).on('click','.fa-plus',function(){OnClickAdd(event);});
$(document).on('click','.fa-refresh',function(){OnClickRefresh(event);});
//---------------------------------------------------------------
$('.selectBlock').hover(function(){OnTextHover(this);});
//---------------------------------------------------------------
}
function OnClickAdd(_event)
{
     console.log($(_event.Target));
    _event.stopPropagation();    
    QuotesAmountParagraph+=2;
    FillText_(""+$(_event.target).parent().parent().attr("class"),QuotesAmountParagraph);

}
//---------------------------------------------------------------
function OnClickRefresh(_event)
{
     console.log($(_event.target));
     _event.stopPropagation();
     FillText_(""+$(_event.target).parent().parent().attr("class"));
}
//---------------------------------------------------------------
function OnTextHover(_obj)
{

  if($(_obj).children().attr("class")==="paragraphText")
  {  
    $(_obj).find('.refresh').toggleClass('refreshVisibleParagraph');
  }else
  {
    $(_obj).find('.refresh').toggleClass('refreshVisible');    
  }   
  
}
//---------------------------------------------------------------
function LoadQuotes()
{
    $.getJSON("Quotes.json","json", function(json)
    {
       QuotesParagraph = json.QuotesParagraph;
       QuotesHeading   = json.QuotesHeading;
       QuotesSuheading = json.QuotesSubheading;

      FillText_("headingText",1);
      FillText_("subHeadingText",1);
      FillText_("paragraphText",QuotesAmountParagraph);
        
    });
}
//---------------------------------------------------------------
function FillText_(_textToFill)
{     
    
    var textSelection;
    var Quotes;
    var text = "";
    var QuoteNumber = "0";
    var quotesAmount = 1;

    if(_textToFill==="headingText"){
        textSelection = HeadingText;
        Quotes = QuotesHeading;
        
    }
    else if(_textToFill==="subHeadingText"){
        textSelection = SubHeadingText;
        Quotes = QuotesSuheading;
        
    }
    else{
        textSelection = ParagraphTextBlock;
        Quotes = QuotesParagraph;
        quotesAmount = QuotesAmountParagraph;
    }

    $(textSelection).each(function()
    {
        text = "";
        for(var i=0;i<quotesAmount;i++)
        {
           QuoteNumber= (Math.floor(Math.random()*QuotesSuheading.length-1|0));       
           text +=" " + Quotes[QuoteNumber];
        }

        $(textSelection).fadeOut(function()
        {
            $(this).html(text).fadeIn();
        });
        
    }); 
}
//---------------------------------------------------------------
function OnCopyToClipBoard(_obj)
{  
 console.log($(_obj).width());
   var objClass = "."+$(_obj).attr("class");   
   var clipBoard = new Clipboard(objClass,
       {
           target: function(trigger)
           {
            return trigger
           } 
         
       });

    $(_obj).fadeTo('fast', 0.5).fadeTo('fast', 1);
    clipBoard.on('success',function(e){e.clearSelection();})
}
//---------------------------------------------------------------
jQuery(document).ready(function(){
    jQuery(document).ready(function(){
       LoadQuotes();
       AddListeners();
    });
});


