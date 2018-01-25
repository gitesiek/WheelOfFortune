var angle = 0, x = 0;
var wygrana = ['5','2.5','Nagrode','2','1.5','Skuter','5','3.5','15','Bankrut','2','AGD','3','2.5','1.5','Wycieczke','1','2','4','Stop','2.5','5','4','Bankrut'];
var kategorie = ['Sport','Zwierze','Zwierze','Sport','Slodkosci'];
var slowa = ['spadochroniarstwo','kot','pies','koszykowka','czekolada'];
var j = 360/24;
var stanKonta1=0,stanKonta2=0;
var konto1 = [], konto2 = [], wrt = [], guessed = [];
var help='', wn, as, newl, xw=50;
var wdir=true, bStop=false, bBank=false, done=true, gracz1=false, claim=false;
function setup() {
    createCanvas(800, 600);
    angleMode(DEGREES);
    img = loadImage("kol.bmp");
    pointy = loadImage("point.bmp");
    button = createButton('Losuj');
    button.position(width/2-button.width/2, height/2-button.height/2);
    button.mousePressed(spin);
    chec = createButton('Sprawdz');
    chec.position(165, 550);
    chec.mousePressed(check);
    input = createInput();
    input.position(0, 550);
    getWord();
    spin();
}
function draw() { 
    background('#FF69b4');
    textSize(40);
    text("Witaj w kole fortuny!!!", xw,20,400,40);
    if(xw==50) wdir=true;
    if(xw==width-450) wdir=false;
    if(wdir==true) xw++;
    else xw--;
    translate(width / 2,height / 2);       
    image(pointy, 0, -150, 40, 40);
    image(img, -125, -125);
    push(); 
    ////spining thing ////
    if(x<angle){
    rotate(x);  
    image(img, -125, -125);
    x++;
    }
    else{
    zd=wygrana[floor((angle-7.5)%360/j)];
    if(typeof zd != "undefined"){       
    if(isFinite(zd)){
    wn=zd*100 
    as=wn+"zl";
    }
    else { 
    wn=zd; 
    as=wn;
    }
    } 
    rotate(angle);
    image(img, -125, -125);
    }
    //////////////////////
    pop();
    textSize(20);
    if(gracz1) gracz="Gracz 1";
    else gracz="Gracz 2";
    if(as=="Bankrut")
    {
    if(gracz1){bBank=true; stanKonta1=0; konto1=[]; spin();}
    else {bBank=true; stanKonta2=0; konto2=[]; spin();}
    }
    if(as=="Stop"){
    bStop=true;
    spin();
    }    
    else grasz = "Grasz o: "+ as;
    if(gracz1) {
    acc="Stan konta: " + stanKonta1 + " Dodatkowo: " + konto1.join();
    }
    else {
    acc="Stan konta: " + stanKonta2 + " Dodatkowo: " + konto2.join();
    }
    haslo="Haslo: " + help; 
    kat = "Kategoria: "+ kategorie[slw];
    
    fill(0);
    text("Gra teraz: "+ gracz, -400, 180, 300, 20);
    text(grasz, -400, 200, 400, 20);       
    text(haslo, -400, 220, width, 20);           
    text(kat, -400, 280, 300, 80);
    text(acc, 0, 180, 400, 80);
    if(bStop)
    {
    if(!gracz1) gracz="Gracz 1";
    else gracz="Gracz 2";
    text(gracz+" musi ominac kolejke bo wylosowal stop", 0, 135, 375, 50);
    if(x==angle-1) bStop=false;
    }
    if(bBank)
    {
    if(!gracz1) gracz="Gracz 1";
    else gracz="Gracz 2";
    text(gracz+" został bankrutem i jest biedny", 0, 160, 375, 20);
    if(x==angle-1) bBank=false;
    }
}
/////////////////////////
function spin(){
as='';
newl=true;
gracz1=!gracz1;
if(done)
{
    help='';
    wrt=[];
    guessed = [];
    getWord();
}
if(guessed.join("")==word) done=true;
claim=false;
angle+=(parseInt(random(500)));
console.log(angle);
}
/////////////////////////
function getWord(){
slw=floor(random(5));
word = slowa[slw];
console.log(word);
done=false;
}
/////////////////////////
function check(){

letter = input.value();

if(guessed.join("")==word) done=true;
if(newl){
newl=false;
if(letter==word){ 
help=letter;
done=true;
}
else{
for(var i=0;i<word.length;i++){
    if(letter==guessed[i])
    {
      spin();
    }
    else if(word[i]==letter)
      {
        guessed[i]=letter;  
        if(gracz1 && claim==false) 
        {
          claim=true;  
          if(isFinite(wn)) stanKonta1+=wn;
          else konto1.push(wn);           
        }
        else if (!gracz1 && claim==false) 
        {
          claim=true;  
          if(isFinite(wn)) stanKonta2+=wn;
          else konto2.push(wn);           
        }
      }
    if(typeof guessed[i] != "undefined")
    wrt[i]=guessed[i];
    else
    wrt[i]=" _ ";
    } 
    help=wrt.join("");
}
if(letter==word){
    if(gracz1 && claim==false) 
        {
          claim=true;  
          if(isFinite(wn)) stanKonta1+=wn;
          else konto1.push(wn);           
        }
        else if(!gracz1 && claim==false) 
        {
          claim=true;  
          if(isFinite(wn)) stanKonta2+=wn;
          else konto2.push(wn);           
        }
}

}
else spin();
}