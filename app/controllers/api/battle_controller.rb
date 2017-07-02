module Api
  class BattleController < ApplicationController
    def random
      brain_paths = [
        'sample_bots/seek_and_destroy.rb',
        'sample_bots/camper.rb',
        'sample_bots/seek_and_destroy.rb',
        'sample_bots/camper.rb'
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
