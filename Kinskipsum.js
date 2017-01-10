var QuotesParagraph = [];
var QuotesHeading   = [];
var QuotesSuheading   = [];
//---------------------------------------------------------------
var QuotesAmountParagraph = 2;
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
$(document).on('click','.fa-minus',function(){OnClickMinus(event);});
//---------------------------------------------------------------
$('.selectBlock').hover(function(){OnTextHover(this);});
//---------------------------------------------------------------
}
function OnClickAdd(_event)
{
     console.log($(_event.target).parent());  
    QuotesAmountParagraph+=2;
    FillText_(""+$(_event.target).parent().parent().attr("class"),QuotesAmountParagraph);
    if(QuotesAmountParagraph>2){$(_event.target).parent().addClass('minusVisible')}
    console.log(QuotesAmountParagraph);
}   
function OnClickMinus(_event)
{
    console.log($(_event.target).parent());
    if(QuotesAmountParagraph>3)
    {
        QuotesAmountParagraph-=2;
        console.log(QuotesAmountParagraph);
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
        console.log(textSelection.length);
        text = "";
        for(var i=0;i<quotesAmount;i++)
        {
           QuoteNumber= (Math.floor(Math.random()*QuotesSuheading.length-1|0)); 
           text +=" " + Quotes[QuoteNumber];                
        }
        
        console.log(text);
        $(this).fadeOut( "fast",function()
        {
            console.log(text);
          $(this).html(text);
           $(this).fadeIn();
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


