import React from "react";
import { Hero } from "./hero";
import { HeroItemComponent } from "./hero-item.component";

import './hero.scss';

type Props = {
    heros: Hero[]
}

type State = {
    currentHero: number;
}

export class HeroComponent extends React.Component<Props, State> {
    private rotationTimer: NodeJS.Timeout | null = null;
    private lastHero = 0;
    private initial = true;

    public state = {
        currentHero: 0
    }

    public componentDidMount() {
        this.setTimer();
    }

    public componentWillUnmount() {
        if (this.rotationTimer) {
            clearTimeout(this.rotationTimer);
        }
    }

    public render() {
        return (
            <div className="hero-component">
                {this.props.heros.map((heroItem, i) =>
                    <HeroItemComponent
                        key={i}
                        index={i}
                        count={this.props.heros.length}
                        hero={heroItem}
                        jumpTo={this.jumpTo}
                        position={this.getPosition(i, this.state.currentHero, this.lastHero, this.initial)}
                    />)}
            </div>
        );
    }

    private getPosition(
        index: number,
        current: number,
        lastHero: number,
        initial: boolean): 'current' | 'initial' | 'previous' | undefined {

        if (initial) {
            if (index === current) {
                return 'initial';
            }

            return;
        }

        if (index === current) {
            return 'current';
        }

        if (index === lastHero) {
            return 'previous'
        }

        return;
    }

    private moveBy = (x: number) => {
        return () => {
            let currentHero = this.state.currentHero + x;

            if (currentHero >= this.props.heros.length) {
                currentHero = 0;
            } else if (currentHero < 0) {
                currentHero = this.props.heros.length - 1;
            }

            this.jumpTo(currentHero);
        };
    }

    private setTimer() {
        if (this.rotationTimer) {
            clearTimeout(this.rotationTimer);
        }
        this.rotationTimer = setTimeout(this.moveBy(1), 10000);
    }

    public jumpTo = (currentHero: number) => {
        this.initial = false;
        this.lastHero = this.state.currentHero;
        this.setTimer();
        this.setState({
            ...this.state,
            currentHero
        });
    }
}
