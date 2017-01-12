var QuotesParagraph = [];
var QuotesHeading   = [];
var QuotesSuheading   = [];
//---------------------------------------------------------------
var QuotesAmountParagraph = 2;
//---------------------------------------------------------------
var ParagraphTextBlock   = $('.paragraphText');
var HeadingText          = $('.headingText');
var SubHeadingText       = $('.subHeadingText');
var FooterText           = $('#footerText');

//---------------------------------------------------------------

function AddListeners(){
$('.paragraphText').click(function(){OnCopyToClipBoard(this);});
$('.headingText').click(function(){OnCopyToClipBoard(this);});
$('.subHeadingText').click(function(){OnCopyToClipBoard(this);});
//---------------------------------------------------------------
$(document).on('click','.fa-plus',function(){OnClickAdd(event);});
$(document).on('click','.fa-refresh',function(){OnClickRefresh(event);});
$(document).on('click','.fa-minus',function(){OnClickMinus(event);});
//---------------------------------------------------------------
$('.selectBlock').hover(function(){OnTextHover(this);});
//---------------------------------------------------------------
}
function OnClickAdd(_event)
{
   
    QuotesAmountParagraph+=2;
    FillText_(""+$(_event.target).parent().parent().attr("class"),QuotesAmountParagraph);
    if(QuotesAmountParagraph>2){$(_event.target).parent().addClass('minusVisible')}
 
}   
function OnClickMinus(_event)
{
  
    if(QuotesAmountParagraph>3)
    {
        QuotesAmountParagraph-=2;
       
        if(QuotesAmountParagraph<4){$(_event.target).parent().removeClass('minusVisible')}
        FillText_(""+$(_event.target).parent().parent().attr("class"),QuotesAmountParagraph);
    } 
   
}
//---------------------------------------------------------------
function OnClickRefresh(_event)
{
     
     _event.stopPropagation();
     FillText_(""+$(_event.target).parent().prev().attr("class"));
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
        
        var _text = "";
        for(var i=0;i<quotesAmount;i++)
        {
           QuoteNumber= (Math.floor(Math.random()*QuotesSuheading.length-1|0)); 
           _text +=" " + Quotes[QuoteNumber];                
        }
        
        
        $(this).fadeOut( "fast",function()
        {console.log(this);
            console.log(_text);
          $(this).html(_text);
           $(this).fadeIn();
        });

    }); 
}

//---------------------------------------------------------------
function OnCopyToClipBoard(_obj)
{  
   
   var objClass = "."+$(_obj).attr("class");   
   var clipBoard = new Clipboard(objClass,
       {
           target: function(trigger)
           {
            return trigger
           } 
         
       });

    $(_obj).fadeTo('fast', 0.5,FooterTextOnCopy()).fadeTo('fast', 1);
    clipBoard.on('success',function(e){e.clearSelection();})
}
//---------------------------------------------------------------
function FooterTextOnCopy(){
     $(FooterText).fadeOut( "fast",function()
        {
          $(FooterText).text("Copied!");
          $(FooterText).fadeIn("fast",function()
          {
              $(FooterText).fadeOut( "slow",function()
              {
                 $(FooterText).text("Click Text To Copy. Hover over text for options.");
                 $(FooterText).fadeIn("slow");
              });
          });
        });
}
//---------------------------------------------------------------
jQuery(document).ready(function(){
    jQuery(document).ready(function(){
       LoadQuotes();
       AddListeners();
    });
});


