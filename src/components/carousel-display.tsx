import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import BeachBeforeURL from "public/carousel/beach-before.jpg";
import BeachAfterURL from "public/carousel/beach-after.png";
import GiraffeBeforeURL from "public/carousel/giraffe-before.jpg";
import GiraffeAfterURL from "public/carousel/giraffe-after.png";
import SeaBeforeURL from "public/carousel/sea-before.jpg";
import SeaAfterURL from "public/carousel/sea-after.png";
import TwoPeopleBeforeURL from "public/carousel/two-people-before.jpg";
import TwoPeopleAfterURL from "public/carousel/two-people-after.png";

export default function CarouselDisplay() {
  const carouselItems = [
    {
      before: BeachBeforeURL,
      after: BeachAfterURL,
    },
    {
      before: GiraffeBeforeURL,
      after: GiraffeAfterURL,
    },
    {
      before: SeaBeforeURL,
      after: SeaAfterURL,
    },
    {
      before: TwoPeopleBeforeURL,
      after: TwoPeopleAfterURL,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          See the Magic in Action
        </h2>
        <p className="text-lg text-gray-600">
          Transform your images with professional-quality background removal
        </p>
      </div>

      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <h3 className="table mx-auto text-lg font-medium text-gray-500 uppercase tracking-wide">
                        Before
                      </h3>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.before || "/placeholder.svg"}
                          alt="Before processing"
                          className="w-full h-100 object-scale-down"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="table mx-auto text-lg font-medium text-gray-500 uppercase tracking-wide">
                        After
                      </h3>
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.after || "/placeholder.svg"}
                          alt="After processing"
                          className="w-full h-100 object-scale-down"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
