import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function CarouselDisplay() {
  const carouselItems = [
    {
      before: "/placeholder.svg?height=300&width=400",
      after: "/placeholder.svg?height=300&width=400",
      title: "Portrait Enhancement",
    },
    {
      before: "/placeholder.svg?height=300&width=400",
      after: "/placeholder.svg?height=300&width=400",
      title: "Product Photography",
    },
    {
      before: "/placeholder.svg?height=300&width=400",
      after: "/placeholder.svg?height=300&width=400",
      title: "Landscape Focus",
    },
    {
      before: "/placeholder.svg?height=300&width=400",
      after: "/placeholder.svg?height=300&width=400",
      title: "Object Isolation",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          See the Magic in Action
        </h2>
        <p className="text-lg text-gray-600">
          Transform your images with professional-quality foreground removal
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Before
                        </h3>
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={item.before || "/placeholder.svg"}
                            alt="Before processing"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          After
                        </h3>
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={item.after || "/placeholder.svg"}
                            alt="After processing"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <h4 className="text-xl font-semibold text-gray-800">
                        {item.title}
                      </h4>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}