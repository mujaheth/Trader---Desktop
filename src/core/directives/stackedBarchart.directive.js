// Usage
// <div data-at-barchart assets="vm.account.assets"></div>
/* global d3 */
/* jshint -W126 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('atStackedbarchart', barchartDirective);

    barchartDirective.$inject = ['$window'];

    /* @ngInject */
    function barchartDirective($window){

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                myAssets: '='
            }
        };

        return directive;

        function link(scope, element) {

            var tableRowHeight = 30; // TODO: take out hard coding

            var base = d3.select(element[0]).append('svg');
            var barChart = new BarChart(base);


            // Redraw whenever assets change
            scope.$watch('myAssets',draw,true);


            // Redraw whenever window resizes
            // TODO: Add a throttle function
            angular.element($window).on('resize', draw);


            scope.$on('$destroy', function() {
                angular.element($window).off('resize', draw);
            });

            function draw() {
                if (!scope.myAssets) { return; }

                barChart
                    .width(element.width())
                    .draw(scope.myAssets);
            }

            function BarChart(base){
                this.base = base;

                this.headingMargin = 30;

                this.margin = {top: 80, right: 50, bottom: 100, left: 50};

                this.legends = [{color : '#fff4ce',text : 'Total Order'},
                                {color :'#fdbd5a',text : 'Placed'},
                                {color :'#fd8300' ,text : 'Executed'} 
                            ];

                this.legendsRect = {width : 15 , height : 15};

                this.legendsBoxWidth  = 150;

                this.axisMargin = 6;

                this.bh = tableRowHeight;

                this.x = d3.scale.linear();

                var formatPercent = d3.format('.0%'); 

                // x Axis
                this.xAxis = d3.svg.axis()
                    .scale(this.x)
                    .orient('top')
                    .ticks(10)
                    .tickFormat(function(d,i){
                        if(i === 0 || i === 5 || i === 10){
                            return formatPercent(d);
                        }
                    });

                // grid Axis
                this.gridAxis = d3.svg.axis()
                    .scale(this.x)
                    .orient('bottom')
                    .ticks(10);

                // x-axis base
                this.xAxisBase = this.base.append('g');

                // grid base
                this.gridBase  = this.base.append('g');

                //plot base
                this.plotBase = this.base.append('g');

                // legend base
                this.legendsBase = this.base.append('g') ;

                // heading Base
                this.headingBase = this.base.append('g');
            }
            
            BarChart.prototype.width = function(newWidth) {
                this.w = newWidth;
                if(newWidth < 760){
                  this.plotWidth = this.w - this.margin.left - this.margin.right; 
                  this.margin.top = 130;
                }else{
                  this.plotWidth = this.w - this.margin.left - this.margin.right - this.legendsBoxWidth; 
                  this.margin.top = 80;
                }
                
                this.base.attr('width', this.w);
                return this;
            };

            BarChart.prototype.draw = function(data) {
                if(data.length === 0){
                    this.base.selectAll('g').attr('visibility', 'hidden');
                }else{
                   this.base.selectAll('g').attr('visibility', 'show');
                }
                this.plotHeight = this.bh * data.length;
                this.h = this.plotHeight + this.margin.top + this.margin.bottom;
                this.base.attr('height', this.h);
                this.x.range([0, this.plotWidth]);

                var that = this;
                

            //   draw the x-axis //

                this.xAxisBase.attr(
                    'transform',
                    'translate(' + this.margin.left + ',' + (this.margin.top - this.axisMargin) + ')'
                )
                .attr('class','axis');

                this.xAxisBase.call(this.xAxis);

            // x-axis drawn... //


             // drw grids
                this.gridBase.attr(
                    'transform',
                    'translate(' + this.margin.left + ',' + (this.margin.top - this.axisMargin) + ')'
                )
                .attr('class','grid');

                this.gridBase.call(this.gridAxis
                    .tickSize(this.plotHeight, 0, 0)
                    .tickFormat('')
                );
            // grid drawn... //



             //draw legends

                if(this.w  > 760){
                    this.legendsBase.attr(
                    'transform',
                    'translate(' + (this.plotWidth + 2 * this.margin.left + this.margin.right ) + ',' + 
                        (this.margin.top + 10) + ')'
                 );
                }else{
                    this.legendsBase.attr(
                    'transform',
                    'translate(' + this.plotWidth + ',' + (this.headingMargin -10) + ')'
                 );
                }
                

                var legends = this.legendsBase
                                    .selectAll('g.legends')
                                    .data(this.legends)
                                    .enter()
                                    .append('g')
                                    .attr('class','legends');

                    legends.append('rect')
                        .attr({
                            width : this.legendsRect.width,
                            height : this.legendsRect.height,
                            y : function(d,i){
                                return (that.legendsRect.height + 10 )*i;
                            },
                            fill : function(d){
                               return d.color;
                            }
                        });

                    legends.append('text')
                        .attr({
                            x : this.legendsRect.width + 5,
                            y : function(d,i){
                                return (that.legendsRect.height + 10 )*i + 14;
                            }
                        })
                        .text(function(d){
                            return d.text;
                        });

            // legends drawn ... //


            // heading  .. // 

               this.headingBase.selectAll('text').remove();


                if(this.w  > 760){
                    this.headingBase.attr(
                    'transform',
                    'translate(' + this.plotWidth / 2 + ',' + this.headingMargin + ')'
                   );
                }else{
                    this.headingBase.attr(
                    'transform',
                    'translate(' + this.margin.left + ',' + (this.headingMargin + 5 )+ ')'
                    );
                }

                this.headingBase
                .append('text')
                .attr('class','chartHeading')
                .text('Order Execution Status');

            // heading completed ..... // 

            

            // Draw plot base

                this.plotBase
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

                // Create the 'update selection' by selecting the bars and joining with data.
                // Update selection contains the DOM elements that were successfully bound to data
                // plus references to enter and exit selections.

                var updateSelection = this.plotBase
                                          .selectAll('g.bar')
                                          .data(data);

                // Remove the exiting bars (this is the 'exit selection')

                 updateSelection.exit()
                       .remove();


                // Get the 'enter selection'
                // Contains placeholder DOM nodes for each data element that was not bound
                var enterSelection = updateSelection.enter();

                // Add a group for each entering element - these are the entering bars
                var barsEnter = enterSelection
                                          .append('g')
                                          .attr('class','bar');


                    function getScales(quantity){
                        return   d3.scale.linear()
                                    .domain([0,quantity])
                                    .range([that.margin.left, that.plotWidth]);
                    }

                // quantity bar 
                    barsEnter
                        .append('rect')
                        .attr({
                             width : function(d){
                                  return getScales(d.quantity)(d.quantity);
                             },
                             height : 25 ,
                             y : function(d,i){
                                return i * 30;
                             },
                             fill : that.legends[0].color,
                             'class' : 'quantity'
                        });

                // quantityPlace bar
                     barsEnter
                        .append('rect')
                        .attr({
                             width : function(d){
                                 return getScales(d.quantity)(d.quantityPlaced);
                             },
                             height : 25 ,
                             y : function(d,i){
                                return i * 30;
                             },
                             fill : that.legends[1].color,
                             'class' : 'quantityPlaced'
                        });


                //quantityExecuted bar
                    barsEnter
                        .append('rect')
                        .attr({
                             width : function(d){
                                 return getScales(d.quantity)(d.quantityExecuted);
                             },
                             height : 25 ,
                             y : function(d,i){
                                return i * 30;
                             },
                             fill : that.legends[2].color,
                             'class' : 'quantityExecuted'
                        });

                // quantity text
                    barsEnter
                        .append('text')
                        .text(function(d){
                          return d.quantity;
                        })
                        .attr({
                             x : function(){
                                return that.plotWidth + that.margin.left;
                             },
                             height : 25 ,
                             y : function(d,i){
                                return i * 30 + 20;
                             },
                             'class' : 'quantityText'
                        })
                        .style('text-anchor','end');

                // id of order         
                    barsEnter
                        .append('text')
                        .text(function(d){
                          return d.id;
                        })
                        .attr({
                             x : function(){
                                return -10;
                             },
                             height : 25 ,
                             y : function(d,i){
                                return i * 30 + 17;
                             }
                        })
                        .style('text-anchor','end');

                // quantity underline 
                    barsEnter
                        .append('rect')
                        .attr('transform', 'translate(' + this.plotWidth + ',' + 0 + ')')
                        .attr({
                             height : 3 ,
                             y : function(d,i){
                                return i * 30 + 22;
                             },
                             width: function(){
                                if(that.w < 760){
                                    return that.w - that.plotWidth -that.margin.right;
                                }else{
                                    return that.w - that.plotWidth -that.margin.right-that.legendsBoxWidth;
                                }
                                
                             },  
                             fill : '#ffefbf',
                             'class' : 'quantityLine'
                        });

                // update quantity

                updateSelection
                   .select('rect.quantity')
                   .attr({
                         width : function(d){
                             return getScales(d.quantity)(d.quantity);
                         }
                   });

                //  update quantity Placed
                updateSelection
                   .select('rect.quantityPlaced')
                   .attr({
                         width : function(d){
                             return getScales(d.quantity)(d.quantityPlaced);
                         }
                   });

                // update quantity Executed
                updateSelection
                   .select('rect.quantityExecuted')
                   .attr({
                         width : function(d){
                             return getScales(d.quantity)(d.quantityExecuted);
                         }
                   });

                // update position of quantity text
                updateSelection
                   .select('text.quantityText')
                   .attr({
                          x : function(){
                            return that.plotWidth + that.margin.left;
                         }
                   });

                // update position of quantity text line
                updateSelection
                   .select('rect.quantityLine')
                   .attr({
                        width: function(){
                            if(that.w < 760){
                                return that.w - that.plotWidth -that.margin.right;
                            }else{
                                return that.w - that.plotWidth -that.margin.right-that.legendsBoxWidth;
                            }
                            
                        }
                   })
                   .attr('transform', 'translate(' + this.plotWidth + ',' + 0 + ')');
            };
        }
    }
})();
