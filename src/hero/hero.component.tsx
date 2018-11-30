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

    public state = {
        currentHero: 0
    }

    public componentDidMount() {
        this.rotationTimer = setInterval(this.moveBy(1), 10000);
    }

    public componentWillUnmount() {
        if (this.rotationTimer) {
            clearInterval(this.rotationTimer);
        }
    }

    public render() {
        return (
            <div className="hero-component">
                {this.props.heros.map((heroItem, i) =>
                    <HeroItemComponent
                        key={i}
                        hero={heroItem}
                        position={this.getPosition(i, this.state.currentHero, this.props.heros.length)}
                    />)}
            </div>
        );
    }

    private getPosition(
        index: number,
        current: number,
        total: number): 'current' | 'next' | 'previous' | undefined {

        if (index === current) {
            return 'current';
        }

        if (index === current - 1) {
            return 'previous';
        }

        if (index === current + 1) {
            return 'next';
        }

        if (current === total - 1 && index === 0) {
            return 'next';
        }

        if (current === 0 && index === total - 1) {
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

            this.setState({
                ...this.state,
                currentHero
            });
        };
    }
}
