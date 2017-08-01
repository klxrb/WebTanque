module Api
  class BattleController < ApplicationController
    def random
      brain_paths = [
        'my_bots/jimmy.rb',
        'my_bots/jimmy.rb',
      ]

      @tmpfile = Tempfile.new
      brain_paths.each do |p|
        @tmpfile.puts(p)
      end
      @tmpfile.close
      system("rake battle:create[#{@tmpfile.path}]")

      render file: @tmpfile.path
    end
  end
end
