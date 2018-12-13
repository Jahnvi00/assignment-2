const money = [
  { level: '1', amount: '100' },
  { level: '2', amount: '200' },
  { level: '3', amount: '300' },
  { level: '4', amount: '500' },
  { level: '5', amount: '1,000' },
  { level: '6', amount: '2,000' },
  { level: '7', amount: '4,000' },
  { level: '8', amount: '8,000' },
  { level: '9', amount: '16,000' },
  { level: '10', amount: '25,000' },
  { level: '11', amount: '50,000' },
  { level: '12', amount: '100,000' },
  { level: '13', amount: '250,000' },
  { level: '14', amount: '500,000' },
  { level: '15', amount: '1,000,000' }
];

const musicRound1 = new Audio('soundsmusic(1)/Round1');

const app = new Vue ({
    el: "#jahnvi",
    mounted(){
        this.getTriviaQs();
        window.addEventListener('keydown', this.clickbutton)
    },
    data:{
        questions:[],
        index:0,
        shuffledArray:[]
    },
    watch: {
        index() {
            this.shuffle();
            console.log(this.currentQ().correct_answer)
        }
    },
    methods:{
        beginGame() {
        musicRound1.play();
        },
        clickbutton(e){
      const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
      if (!key) return;
      key.click();
        },
        isAnswerCorrect(e) {
        //const index = e.target.dataset.index;
        ({index} = e.target.dataset);
        const selectedAnswer = this.shuffledArray[index];
        if (selectedAnswer === this.currentQ().correct_answer) {
           this.index += 1;
        
         } else {
             console.log('wrong');
         }
        },
        currentQ(){
            return this.questions[this.index];
        },
        possibleAnswers(idx){
            return this.shuffledArray[idx];
        },
            shuffle(){
                const tempArr=[
                    this.currentQ().correct_answer,
                    ...this.currentQ().incorrect_answers
                ];
                this.shuffledArray = _.shuffle(tempArr);
            },
        async getTriviaQs(){
            const response = await fetch('https://opentdb.com/api.php?amount=15&category=18&type=multiple');
            const data = await response.json();
            this.questions = data.results;
            this.shuffle();
            console.log(this.currentQ().correct_answer);
        }
    }
});
