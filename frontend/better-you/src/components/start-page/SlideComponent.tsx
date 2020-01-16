import React, { Component } from "react";
import "../../assets/scss/start-page/CarouselStyle.scss";
import { Breakpoint } from "react-socks";

interface SlideComponentProps {
  index: number;
}

interface SlideComponentState {}

export default class SlideComponent extends Component<
  SlideComponentProps,
  SlideComponentState
> {
  render() {
    return (
      <div className="slide">
        <Breakpoint medium up className="slide-breakpoint">
          <div className="image">
            <img
              className="slide-image-content"
              src={"../assets/photos/img" + this.props.index + ".png"}
              alt={"to be implemented"}
            />
          </div>
          <div className="content">
            <p>
              {slideTexts[Math.floor(this.props.index / 2)]}
            </p>
          </div>
        </Breakpoint>

        <Breakpoint small down>
          {this.props.index % 2 === 0 ? (
            <div className="image">
              <img
                className="slide-image-content"
                src={"../assets/photos/img" + this.props.index + ".png"}
                alt={"to be implemented"}
              />
            </div>
          ) : (
            <div className="content">
              <p>
                {slideTexts[Math.floor(this.props.index / 2)]}
              </p>
            </div>
          )}
        </Breakpoint>
      </div>
    );
  }
}

const slideTexts = [
  'If you\'re serious about achieving your goals, not only do you need to set those goals the right way, but you also ' +
  'have to get serious about avoiding distractions and becoming too immersed in the bad habits that you know you need ' +
  'to quit.',
  'With hard work, determination and some smart planning, you really are capable of so much more than you think. Don’t ' +
  'ever underestimate what you are capable of. Remember to dream big and aim high.',
  'Break down your big goals into smaller ones and then tackle them individually. When it’s broken down into achievable' +
  ' phases, it feels more manageable and you are more likely to keep moving ahead. If you want to run a marathon, you ' +
  'would start with a goal of running 10k, rather than just focusing on the entire 26.2 to start. ',
  'When working towards a goal, it’s important to have regular checks to see how you are progressing. If you aren’t ' +
  'tracking well, it’s time to reassess and see what you can do to keep improving and succeeding.',
  'When working towards a big goal or dream, it’s important to stay motivated every day. Motivation doesn’t always come ' +
  'constantly or easily, so I find writing down your ‘why’ and practicing visualizations of how you will feel once you' +
  ' reach your goal are both awesome tools to help with motivation.',
];
